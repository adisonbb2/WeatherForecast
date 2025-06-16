import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from xgboost import XGBRegressor
from sklearn.metrics import mean_squared_error, mean_absolute_error
from sklearn.preprocessing import StandardScaler
import joblib


class PM25Predictor:
    def __init__(self):
        self.model = XGBRegressor()
        self.scaler = StandardScaler()
        
    # ------------------- Step 1: Load and Combine Data ------------------- #
    def load_data(self, base_url, years=['2020', '2021', '2022', '2023']):
        train_df_list = []
        for year in years:
            url = base_url + f'average_daliy_PM2.5({year}).xlsx'
            df = pd.read_excel(url, index_col=0, parse_dates=True)
            train_df_list.append(df)
        
        train_df = pd.concat(train_df_list)
        test_url = base_url + 'average_daliy_PM2.5(2024).xlsx'
        test_df = pd.read_excel(test_url, index_col=0, parse_dates=True)
        
        return train_df, test_df
    
    def create_features(self, df, province_name):
        df = df.copy()
        df['dayofyear'] = df.index.dayofyear
        df['month'] = df.index.month
        df['weekday'] = df.index.weekday
        df['lag1'] = df[province_name].shift(1)
        df['lag2'] = df[province_name].shift(2)
        df['lag3'] = df[province_name].shift(3)
        return df
    
    def prepare_data(self, train_df, test_df, province):
        full_df = pd.concat([train_df, test_df])
        full_feat = self.create_features(full_df[[province]], province)
        
        train_feat = full_feat.loc[train_df.index].dropna()
        test_feat = full_feat.loc[test_df.index]
        
        X_train = train_feat.drop(columns=[province])
        X_test = test_feat.drop(columns=[province])
        y_train = train_feat[province]
        y_test = test_feat[province]
        
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        return X_train_scaled, X_test_scaled, y_train, y_test
    
    def train(self, X_train, y_train):
        self.model.fit(X_train, y_train)
        model = joblib.load('pm25_xgb_model.pkl')
        
    def predict(self, X_test):
        return self.model.predict(X_test)
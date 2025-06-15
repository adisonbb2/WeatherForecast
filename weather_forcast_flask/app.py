from flask import Flask, render_template, request, redirect, url_for
from datetime import datetime, timedelta
import random

app = Flask(__name__)

# Mock data for Thai provinces
PROVINCES = [
    'Bangkok', 'Chiang Mai', 'Chiang Rai', 'Phuket', 'Khon Kaen',
    'Nakhon Ratchasima', 'Ubon Ratchathani', 'Songkhla', 'Rayong',
    'Chonburi', 'Samut Prakan', 'Nonthaburi', 'Pathum Thani'
]

# Mock hotel data
MOCK_HOTELS = {
    'Bangkok': [
        {'name': 'Grand Palace Hotel', 'rating': 4.5, 'price': '฿2,500', 'distance': '2.1 km'},
        {'name': 'Riverside Resort', 'rating': 4.2, 'price': '฿1,800', 'distance': '3.5 km'},
        {'name': 'City Center Inn', 'rating': 4.0, 'price': '฿1,200', 'distance': '1.8 km'},
        {'name': 'Bangkok Boutique', 'rating': 4.3, 'price': '฿2,200', 'distance': '2.7 km'}
    ],
    'Chiang Mai': [
        {'name': 'Mountain View Lodge', 'rating': 4.6, 'price': '฿1,500', 'distance': '1.2 km'},
        {'name': 'Old City Hotel', 'rating': 4.4, 'price': '฿1,100', 'distance': '0.8 km'},
        {'name': 'Northern Comfort', 'rating': 4.1, 'price': '฿900', 'distance': '2.3 km'},
        {'name': 'Chiang Mai Resort', 'rating': 4.5, 'price': '฿1,800', 'distance': '3.1 km'}
    ],
    'Phuket': [
        {'name': 'Beach Paradise Resort', 'rating': 4.7, 'price': '฿3,200', 'distance': '0.5 km'},
        {'name': 'Island Breeze Hotel', 'rating': 4.3, 'price': '฿2,100', 'distance': '1.1 km'},
        {'name': 'Tropical Getaway', 'rating': 4.2, 'price': '฿1,900', 'distance': '1.8 km'},
        {'name': 'Sunset Villa', 'rating': 4.5, 'price': '฿2,800', 'distance': '0.7 km'}
    ]
}

def generate_mock_pm25_data(selected_date, province):
    """Generate mock PM2.5 data for 7 days"""
    base_pm25 = random.randint(15, 85)  # Base PM2.5 value
    
    forecast_data = []
    for i in range(7):
        date = selected_date + timedelta(days=i)
        # Add some variation to make it realistic
        variation = random.randint(-10, 15)
        pm25_value = max(5, min(150, base_pm25 + variation))
        
        # Determine air quality level
        if pm25_value <= 25:
            level = "Good"
            color = "success"
        elif pm25_value <= 50:
            level = "Moderate"
            color = "warning"
        elif pm25_value <= 75:
            level = "Unhealthy for Sensitive Groups"
            color = "orange"
        else:
            level = "Unhealthy"
            color = "danger"
        
        forecast_data.append({
            'date': date.strftime('%Y-%m-%d'),
            'day_name': date.strftime('%A'),
            'pm25': pm25_value,
            'level': level,
            'color': color
        })
    
    return forecast_data

@app.route('/')
def index():
    return render_template('index.html', provinces=PROVINCES)

@app.route('/forecast', methods=['POST'])
def forecast():
    selected_date_str = request.form.get('date')
    selected_province = request.form.get('province')
    
    if not selected_date_str or not selected_province:
        return redirect(url_for('index'))
    
    try:
        selected_date = datetime.strptime(selected_date_str, '%Y-%m-%d').date()
    except ValueError:
        return redirect(url_for('index'))
    
    # Generate mock forecast data
    forecast_data = generate_mock_pm25_data(selected_date, selected_province)
    
    # Get mock hotel data
    hotels = MOCK_HOTELS.get(selected_province, MOCK_HOTELS['Bangkok'][:2])  # Default fallback
    
    return render_template('results.html', 
                         forecast_data=forecast_data,
                         selected_province=selected_province,
                         selected_date=selected_date_str,
                         hotels=hotels)

if __name__ == '__main__':
    app.run(debug=True)
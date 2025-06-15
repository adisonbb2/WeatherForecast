# AirCast Thailand - PM2.5 Forecasting Website

A clean, user-friendly Flask web application template for PM2.5 air pollution forecasting in Thailand.

## Project Structure

```
aircast-thailand/
│
├── app.py                      # Main Flask application
├── requirements.txt            # Python dependencies
│
├── templates/                  # HTML templates
│   ├── base.html              # Base template with navigation
│   ├── index.html             # Home page with date/province selection
│   └── results.html           # Results page with forecast and hotels
│
├── static/                     # Static assets
│   ├── css/
│   │   └── style.css          # Custom CSS styles
│   └── js/
│       └── main.js            # JavaScript functionality
│
└── README.md                   # This file
```

## Features

### 🎨 Design & User Experience
- **Soft, accessible design** with gentle gradients and rounded corners
- **Responsive layout** that works on all devices
- **High contrast support** and keyboard navigation
- **Reduced motion support** for users with vestibular disorders
- **Clean typography** using Inter font family

### 🌟 Pages & Functionality
1. **Home Page (`/`)**
   - Province selection dropdown (13 major Thai provinces)
   - Date picker with validation (today to 30 days ahead)
   - Clean form with accessible labels and error handling

2. **Results Page (`/forecast`)**
   - Current day PM2.5 highlight card
   - 7-day forecast grid with color-coded air quality levels
   - Mock hotel recommendations with ratings and pricing
   - Responsive cards with hover effects

### 🔧 Technical Features
- **Flask backend** with clean route structure
- **Bootstrap 5** for responsive components
- **Font Awesome icons** for visual consistency
- **Form validation** (client-side and server-side ready)
- **Mock data generation** for testing and development
- **SEO-friendly** HTML structure

## Installation & Setup

### 1. Create Project Directory
```bash
mkdir aircast-thailand
cd aircast-thailand
```

### 2. Create Virtual Environment
```bash
python -m venv venv

# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Create Directory Structure
```bash
mkdir templates static
mkdir static/css static/js
```

### 5. Add Files
Copy the provided files into their respective directories:
- `app.py` → root directory
- `base.html`, `index.html`, `results.html` → `templates/`
- `style.css` → `static/css/`
- `main.js` → `static/js/`

### 6. Run the Application
```bash
python app.py
```

The application will be available at `http://localhost:5000`

## Customization Guide

### Adding New Provinces
Edit the `PROVINCES` list in `app.py`:
```python
PROVINCES = [
    'Bangkok', 'Chiang Mai', 'Your New Province'
]
```

### Modifying Mock Data
Update the `MOCK_HOTELS` dictionary in `app.py` to add hotels for new provinces.

### Styling Changes
- **Colors**: Modify CSS variables in `:root` section of `style.css`
- **Fonts**: Change the Google Fonts import in `base.html`
- **Layout**: Adjust Bootstrap classes in templates

### Adding Real Data Integration
The template is designed for easy integration:

1. **PM2.5 Data**: Replace `generate_mock_pm25_data()` in `app.py`
2. **Hotel API**: Replace `MOCK_HOTELS` with real API calls
3. **Database**: Add SQLAlchemy or your preferred ORM

## Color Scheme

The design uses a soft, accessible color palette:
- **Primary**: `#6366f1` (Indigo)
- **Success**: `#10b981` (Emerald) 
- **Warning**: `#f59e0b` (Amber)
- **Danger**: `#ef4444` (Red)
- **Background**: `#fafafa` (Light gray)

## Accessibility Features

- ✅ WCAG 2.1 AA compliant color contrast
- ✅ Keyboard navigation support
- ✅ Screen reader announcements
- ✅ Focus indicators
- ✅ Semantic HTML structure
- ✅ Responsive text sizing
- ✅ Reduced motion support

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Next Steps for Production

1. **Add real PM2.5 API integration**
2. **Implement hotel booking API**
3. **Add user authentication if needed**
4. **Set up database for historical data**
5. **Add caching for better performance**
6. **Configure production WSGI server**
7. **Add error logging and monitoring**

## License

This template is provided as-is for development purposes. Customize as needed for your specific use case.
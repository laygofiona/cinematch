cd# CineMatch

A platform that helps you find your match based on your taste in movies

To run Flask server:

1. Set up Python virtual environment called 'venv'
   
   Run:
   ```bash
   python3 -m venv venv
   ```
2. Activate the virtual environment
   Run:
   ```bash
   source venv/bin/activate
   ```
3. Download packages and modules from requirements.txt into the virtual environment
   Run:
   ```bash
   pip3 install -r requirements.txt
   ```
4. Set up .env file with SUPABASE_URL and SUPABASE_KEY in /backend_recs
5. CD into /backend_recs
6. Run Flask server
   Run:
   ```bash
   flask run --host=0.0.0.0
   ```

Flask server can now be accessed at either http://localhost:5000 
   

# Guidelines to run Code

**1.** Make virtual environment
```
python -m venv env
```
```
source env/Scripts/activate
```

**2.** install depenedency
```
pip install -r requirements.txt
```

**3.** Check for Trained Model
if no train data : 
```
python data/training/train.py
```

**4.** Create .env file and Add key
```
GROQ_API_KEY : " "
```

**5.** Run application
```
python main.py
```

**6.** Run Test cases Command
```
pytest tests/
```



//for window
# Step 1: Make virtual environment
python -m venv env

# Step 2: Activate the virtual environment
env\Scripts\activate

# Step 3: Install dependencies
pip install -r requirements.txt

# Step 4: Check for Trained Model (if no train data)
python data\training\train.py

# Step 6: Run the application
python main.py

# Step 7: Run Test Cases
pytest tests/

import sys
import json
import pickle
import numpy as np
import pandas as pd

# Load the model
with open('logistic_regression_model.pkl', 'rb') as file:
    model = pickle.load(file)

# Get input data from command line argument
input_data = json.loads(sys.argv[1])

# Define feature names
feature_names = [
    'time_in_hospital', 'n_lab_procedures', 'n_procedures', 'n_medications',
    'n_outpatient', 'n_inpatient', 'n_emergency', 'change', 'diabetes_med',
    'age_midpoint', 'med_spec_Cardiology', 'med_spec_Emergency/Trauma',
    'med_spec_Family/GeneralPractice', 'med_spec_InternalMedicine',
    'med_spec_Missing', 'med_spec_Other', 'med_spec_Surgery',
    'diag_1_Circulatory', 'diag_1_Diabetes', 'diag_1_Digestive',
    'diag_1_Injury', 'diag_1_Missing', 'diag_1_Musculoskeletal',
    'diag_1_Other', 'diag_1_Respiratory', 'diag_2_Circulatory',
    'diag_2_Diabetes', 'diag_2_Digestive', 'diag_2_Injury',
    'diag_2_Missing', 'diag_2_Musculoskeletal', 'diag_2_Other',
    'diag_2_Respiratory', 'diag_3_Circulatory', 'diag_3_Diabetes',
    'diag_3_Digestive', 'diag_3_Injury', 'diag_3_Missing',
    'diag_3_Musculoskeletal', 'diag_3_Other', 'diag_3_Respiratory',
    'glucose_test_high', 'glucose_test_no', 'glucose_test_normal',
    'A1Ctest_high', 'A1Ctest_no', 'A1Ctest_normal'
]

# Create a DataFrame with feature names
input_df = pd.DataFrame([input_data], columns=feature_names)

# Make prediction
prediction = model.predict(input_df)

# Print the prediction (will be captured by Node.js)
print(json.dumps(prediction.tolist()))
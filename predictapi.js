const router = require('express').Router();
const { spawn } = require('child_process');

const expectedCategories = {
    medical_specialty: ['InternalMedicine', 'Other', 'Emergency/Trauma', 
                        'Family/GeneralPractice', 'Cardiology', 'Surgery','Missing'],
    
    diag_1: ['Circulatory', 'Other', 'Respiratory', 
             'Digestive', 'Diabetes', 'Injury', 
             'Musculoskeletal','Missing'],
    
    diag_2: ['Other', 'Circulatory', 
             'Diabetes', 'Respiratory',
             'Digestive', 'Injury',
             'Musculoskeletal','Missing'],
    
    diag_3: ['Other', 'Circulatory',
             'Diabetes', 'Respiratory',
             'Digestive', 'Injury',
             'Musculoskeletal','Missing'],
    
    glucose_test: ['no', 'normal', 'high'],
    A1Ctest: ['no', 'normal', 'high']
};


router.post('/predict', (req, res) => {
   
    const inputData = req.body;

    // Initialize processed data with zeros for all expected features
    const processedData = {};
    
    // Handle age
    processedData['age_midpoint'] = parseInt(inputData.age.replace(/[\[\]()]/g, '').split('-')[0]) + 5;

    // Handle numerical columns
    const numericalCols = ['time_in_hospital', 'n_lab_procedures', 
                           'n_procedures', 'n_medications',
                           'n_outpatient', 'n_inpatient',
                           'n_emergency'];

    numericalCols.forEach(col => {
        processedData[col] = parseFloat(inputData[col]);
    });

    // One-hot encoding for categorical columns
    expectedCategories.medical_specialty.forEach(option => {
        processedData[`med_spec_${option}`] = (inputData.medical_specialty === option) ? 1 : 0;
    });

    expectedCategories.diag_1.forEach(option => {
        processedData[`diag_1_${option}`] = (inputData.diag_1 === option) ? 1 : 0;
    });

    expectedCategories.diag_2.forEach(option => {
        processedData[`diag_2_${option}`] = (inputData.diag_2 === option) ? 1 : 0;
    });

    expectedCategories.diag_3.forEach(option => {
        processedData[`diag_3_${option}`] = (inputData.diag_3 === option) ? 1 : 0;
    });

    expectedCategories.glucose_test.forEach(option => {
        processedData[`glucose_test_${option}`] = (inputData.glucose_test === option) ? 1 : 0;
    });

    expectedCategories.A1Ctest.forEach(option => {
        processedData[`A1Ctest_${option}`] = (inputData.A1Ctest === option) ? 1 : 0;
    });

    // Handle binary columns
    processedData['change'] = inputData.change === 'yes' ? 1 : 0;
    processedData['diabetes_med'] = inputData.diabetes_med === 'yes' ? 1 : 0;

   
    // Call Python script for prediction
    const pythonProcess = spawn('python', ['predict.py', JSON.stringify(processedData)]);

    let prediction = '';

    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python Output: ${data}`);
        prediction += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python Error: ${data}`);
        return res.status(500).json({ error: 'Prediction failed' });
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            return res.status(500).json({ error: 'Prediction failed' });
        }
        res.json({ prediction: JSON.parse(prediction) });
    });


});


module.exports = router;
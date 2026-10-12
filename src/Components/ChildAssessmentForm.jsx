import { useState } from 'react';
import { assessChildGrowth } from '../data/whoChildGrowth.js';

export default function ChildAssessmentForm() {
    const [formData, setFormData] = useState({
        sex: 'boys',
        age: '',
        weight: '',
        lengthHeight: ''
    });

    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        setResult(null);

        const age = parseFloat(formData.age);
        const weight = parseFloat(formData.weight);
        const lengthHeight = parseFloat(formData.lengthHeight);

        if (isNaN(age) || age < 0 || age > 60) {
            setError('Idade tenki entre 0 no 60 fulan');
            return;
        }

        if (isNaN(weight) || weight <= 0) {
            setError('Peso tenki numeru pozitivu');
            return;
        }

        if (isNaN(lengthHeight) || lengthHeight <= 0) {
            setError('Komprimentu/Aas tenki numeru pozitivu');
            return;
        }

        const assessment = assessChildGrowth({
            sex: formData.sex,
            age: age,
            weight: weight,
            lengthHeight: lengthHeight
        });

        if (assessment && assessment.error) {
            setError(assessment.error);
            setResult(null);
        } else if (assessment) {
            setResult(assessment);
        } else {
            setError('Erro iha prosesu avaliasaun.');
        }
    };

    const getTetunClassification = (classification) => {
        if (!classification || classification === 'Data la válidu') {
            return 'Data la válidu';
        }

        const translations = {
            'Severely underweight': 'Kuru tebes',
            'Underweight': 'Kuru',
            'Normal': 'Normal',
            'Above normal': 'Aas liu',
            'Severely stunted': 'Badak tebes',
            'Stunted': 'Badak',
            'Tall': 'Aas liu',
            'Severe wasting': 'Mahiis tebes',
            'Wasting': 'Mahiis',
            'Overweight': 'Aas liu',
            'Obesity': 'Bosok tebes',
            'Severe thinness': 'Mahiis tebes',
            'Thinness': 'Mahiis',
            'Risk of overweight': 'Risku aas liu'
        };

        return translations[classification] || classification;
    };

    const getClassificationColor = (classification) => {
        if (!classification || classification === 'Data la válidu' || classification === 'Normal') {
            return '#4CAF50';
        }

        const severe = ['Severely underweight', 'Severely stunted', 'Severe wasting', 'Severe thinness'];
        const moderate = ['Underweight', 'Stunted', 'Wasting', 'Thinness'];
        const warning = ['Above normal', 'Overweight', 'Risk of overweight'];

        if (severe.includes(classification)) return '#F44336';
        if (moderate.includes(classification)) return '#FF9800';
        if (warning.includes(classification)) return '#FFC107';
        return '#4CAF50';
    };

    const formatZScore = (zScore) => {
        if (zScore === null || zScore === undefined) return '-';
        return zScore.toFixed(2);
    };

    const formatBMI = (bmi) => {
        if (!bmi) return '-';
        return bmi.toFixed(2);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ textAlign: 'center', color: '#2c3e50', borderBottom: '3px solid #3498db', paddingBottom: '10px' }}>
                🏥 NutriSira - Avaliasaun Kresimentu
            </h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
                Avalia estadu nutrisaun labarik bazeia ba padraun WHO
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label style={{ fontWeight: 'bold' }}>Sexu:</label>
                    <select
                        name="sex"
                        value={formData.sex}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '10px', marginTop: '5px', border: '2px solid #bdc3c7', borderRadius: '6px', fontSize: '16px' }}
                    >
                        <option value="boys">👦 Mane (Boys)</option>
                        <option value="girls">👧 Feto (Girls)</option>
                    </select>
                </div>

                <div>
                    <label style={{ fontWeight: 'bold' }}>Idade (fulan):</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Ex: 12"
                        min="0"
                        max="60"
                        step="0.5"
                        style={{ width: '100%', padding: '10px', marginTop: '5px', border: '2px solid #bdc3c7', borderRadius: '6px', fontSize: '16px' }}
                    />
                    <small style={{ color: '#7f8c8d' }}>0-60 fulan</small>
                </div>

                <div>
                    <label style={{ fontWeight: 'bold' }}>Peso (kg):</label>
                    <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        placeholder="Ex: 9.5"
                        min="0"
                        step="0.1"
                        style={{ width: '100%', padding: '10px', marginTop: '5px', border: '2px solid #bdc3c7', borderRadius: '6px', fontSize: '16px' }}
                    />
                </div>

                <div>
                    <label style={{ fontWeight: 'bold' }}>Komprimentu / Aas (cm):</label>
                    <input
                        type="number"
                        name="lengthHeight"
                        value={formData.lengthHeight}
                        onChange={handleChange}
                        placeholder="Ex: 75.5"
                        min="0"
                        step="0.1"
                        style={{ width: '100%', padding: '10px', marginTop: '5px', border: '2px solid #bdc3c7', borderRadius: '6px', fontSize: '16px' }}
                    />
                    <small style={{ color: '#7f8c8d' }}>
                        {formData.age && parseFloat(formData.age) < 24 
                            ? '📏 Komprimentu (besik) ba idade < 24 fulan' 
                            : '📏 Aas (hamriik) ba idade ≥ 24 fulan'}
                    </small>
                </div>

                {error && (
                    <div style={{ 
                        color: '#e74c3c', 
                        padding: '12px', 
                        backgroundColor: '#fde8e8', 
                        borderRadius: '6px',
                        borderLeft: '4px solid #e74c3c'
                    }}>
                        ⚠️ {error}
                    </div>
                )}

                <button
                    type="submit"
                    style={{
                        padding: '14px',
                        backgroundColor: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
                >
                    🔍 Avalia Agora
                </button>
            </form>

            {result && (
                <div style={{ marginTop: '30px' }}>
                    <h3 style={{ borderBottom: '2px solid #3498db', paddingBottom: '10px', color: '#2c3e50' }}>
                        📊 Rezultadu Avaliasaun
                    </h3>

                    {result.weightForAge && (
                        <div style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #3498db' }}>
                            <h4 style={{ marginTop: 0, color: '#2c3e50' }}>⚖️ Weight-for-Age (Peso ba idade)</h4>
                            <p><strong>Z-Score:</strong> {formatZScore(result.weightForAge.zScore)}</p>
                            <p>
                                <strong>Klasifikasaun:</strong>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '4px 12px',
                                    borderRadius: '12px',
                                    marginLeft: '10px',
                                    backgroundColor: getClassificationColor(result.weightForAge.classification),
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>
                                    {getTetunClassification(result.weightForAge.classification)}
                                </span>
                            </p>
                        </div>
                    )}

                    {result.lengthHeightForAge && (
                        <div style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #2ecc71' }}>
                            <h4 style={{ marginTop: 0, color: '#2c3e50' }}>📏 Length/Height-for-Age (Komprimentu/Aas ba idade)</h4>
                            <p><strong>Z-Score:</strong> {formatZScore(result.lengthHeightForAge.zScore)}</p>
                            <p>
                                <strong>Klasifikasaun:</strong>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '4px 12px',
                                    borderRadius: '12px',
                                    marginLeft: '10px',
                                    backgroundColor: getClassificationColor(result.lengthHeightForAge.classification),
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>
                                    {getTetunClassification(result.lengthHeightForAge.classification)}
                                </span>
                            </p>
                        </div>
                    )}

                    {result.weightForHeight && (
                        <div style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #f39c12' }}>
                            <h4 style={{ marginTop: 0, color: '#2c3e50' }}>📊 Weight-for-Height (Peso ba komprimentu/aas)</h4>
                            <p><strong>Z-Score:</strong> {formatZScore(result.weightForHeight.zScore)}</p>
                            <p>
                                <strong>Klasifikasaun:</strong>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '4px 12px',
                                    borderRadius: '12px',
                                    marginLeft: '10px',
                                    backgroundColor: getClassificationColor(result.weightForHeight.classification),
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>
                                    {getTetunClassification(result.weightForHeight.classification)}
                                </span>
                            </p>
                        </div>
                    )}

                    {result.bmiForAge && (
                        <div style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '8px', borderLeft: '4px solid #2196F3' }}>
                            <h4 style={{ marginTop: 0, color: '#2c3e50' }}>📈 BMI-for-Age (BMI ba idade)</h4>
                            <p><strong>BMI:</strong> {formatBMI(result.bmiForAge.bmi)} kg/m²</p>
                            <p><strong>Z-Score:</strong> {formatZScore(result.bmiForAge.zScore)}</p>
                            <p>
                                <strong>Klasifikasaun:</strong>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '4px 12px',
                                    borderRadius: '12px',
                                    marginLeft: '10px',
                                    backgroundColor: getClassificationColor(result.bmiForAge.classification),
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>
                                    {getTetunClassification(result.bmiForAge.classification)}
                                </span>
                            </p>
                        </div>
                    )}
                </div>
            )}

            {!result && !error && (
                <div style={{ 
                    marginTop: '30px', 
                    padding: '30px', 
                    textAlign: 'center',
                    backgroundColor: '#f0f4f8', 
                    borderRadius: '8px',
                    border: '2px dashed #bdc3c7'
                }}>
                    <p style={{ fontSize: '18px', color: '#7f8c8d' }}>
                        📋 Preenche dadus iha leten no klik "Avalia Agora"<br />
                        <small style={{ fontSize: '14px' }}>Hodi haree rezultadu avaliasaun</small>
                    </p>
                </div>
            )}
        </div>
    );
}
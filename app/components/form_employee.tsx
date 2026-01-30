import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'



const EmployeeForm = ({ initialData, onSubmit, isEditing = false }: any) => {
    const initialState = initialData || {
        full_name: '',
        email: '',
        phone_number: '',
        date_of_birth: '',
        job_title: '',
        departement: '',
        start_date: '',
        end_date: '',
        id_card: '',
        cv: ''
    };

    const [formData, setFormData] = useState(initialState);
    const [id_card, setIdCard] = useState(initialState.id_card);
    const [cv, setCv] = useState(initialState.cv);


    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };
    

    const handleSubmit = (e: any) => {
        try {
            setLoading(true);
            e.preventDefault();
            onSubmit(formData);
        } catch (error: any) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }

    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-sm border border-gray-200"
        >

            <h2 className="text-2xl font-bold text-gray-800 mb-8">
                {isEditing ? "Edit profile" : "New employee"}
            </h2>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="grid grid-cols-1 gap-x-4 gap-y-4">

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                        required
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"

                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                        <PhoneInput
                            enableAreaCodes={true}

                            inputProps={{
                                name: "phone_number",
                                required: true,
                                autoFocus: true,
                                className: "w-full px-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"

                            }}
                            value={formData.phone_number}
                            onChange={(value) => handleChange({ target: { name: 'phone_number', value } })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                        <input
                            type="date"
                            name="date_of_birth"
                            required
                            value={formData.date_of_birth}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Intitulé du poste *</label>
                        <input
                            required
                            type="text"
                            name="job_title"
                            value={formData.job_title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Departement</label>
                        <input
                            type="text"
                            name="departement"
                            value={formData.departement}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white transition-all"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                        <input
                            type="date"
                            required
                            name="start_date"
                            value={formData.start_date}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input
                            type="date"
                            name="end_date"
                            value={formData.end_date}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Carte d'identité</label>
                        <input
                            type="file"
                            name="id_card"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setIdCard(file);
                                }
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CV</label>
                        <input
                            type="file"
                            name="cv"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setCv(file);
                                }
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        />
                    </div>
                </div>


            </div>


            <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-md shadow-blue-200 mt-8"
            >
                {isEditing ? "Mettre à jour" : "Enregistrer l'employé"}
            </button>

        </form>
    );
};

export default EmployeeForm;
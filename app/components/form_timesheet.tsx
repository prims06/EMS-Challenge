import React, { useState } from 'react';

const TimesheetForm = ({ initialData, employees, onSubmit, isEditing = false }: any) => {

    const initialState = initialData || {
        title: '',
        start_time: '',
        end_time: '',
        employee_id: ''
    };

    const [formData, setFormData] = useState(initialState);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        try {
            if (new Date(formData.start_time) >= new Date(formData.end_time)) {
                setError("Start time must be before end time.");
                return;
            }
            if (isLoading) return;
            if (!formData.employee_id) {
                setError("Please select an employee.");
                return;
            }
            setLoading(true);
            onSubmit({ ...formData, employee_id: formData.employee_id });
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-sm border border-gray-200"
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
                {isEditing ? "Edit timesheet" : "New timesheet"}
            </h2>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="grid grid-cols-1 gap-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employee *</label>
                    <select
                        required
                         defaultValue={''} 
                        name="employee_id"
                        value={formData.employee_id}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white transition-all"
                    >
                        <option value="">Select employee</option>
                        {employees.map((emp: any) => (
                            <option key={emp.id} value={emp.id}>
                                {emp.full_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    />
                </div>

                {/* Time Range */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
                        <input
                            required
                            type="datetime-local"
                            name="start_time"
                            value={formData.start_time}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
                        <input
                            required
                            type="datetime-local"
                            name="end_time"
                            value={formData.end_time}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-md shadow-blue-200 mt-8 disabled:bg-gray-400 transition-all"
            >
                {isEditing ? "Update" : "Save"}
            </button>
        </form>
    );
};

export default TimesheetForm;
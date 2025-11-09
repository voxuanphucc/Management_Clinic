import React, { useState } from 'react';
import { usePatients, useCreatePatient, useDeletePatient } from '@/hooks/usePatients';

/**
 * Example component sử dụng React Query
 * Component này demo cách sử dụng useQuery và useMutation
 */
const PatientListExample = () => {
    const [filters, setFilters] = useState({ search: '', status: 'all' });

    // useQuery - Fetch data
    const { data: patients, isLoading, isError, error, refetch } = usePatients(filters);

    // useMutation - Create patient
    const createPatient = useCreatePatient();

    // useMutation - Delete patient
    const deletePatient = useDeletePatient();

    // Handle create
    const handleCreate = async () => {
        const newPatient = {
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@email.com',
            phone: '0123456789',
            address: 'Hà Nội',
        };

        try {
            await createPatient.mutateAsync(newPatient);
            // Toast notification đã được xử lý trong hook
        } catch (error) {
            // Error handling đã được xử lý trong hook
            console.error(error);
        }
    };

    // Handle delete
    const handleDelete = async (patientId) => {
        if (window.confirm('Bạn có chắc muốn xóa bệnh nhân này?')) {
            try {
                await deletePatient.mutateAsync(patientId);
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="ml-4 text-gray-600">Đang tải danh sách bệnh nhân...</p>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-red-800 font-semibold mb-2">Có lỗi xảy ra!</h3>
                <p className="text-red-600">{error?.message || 'Không thể tải dữ liệu'}</p>
                <button
                    onClick={() => refetch()}
                    className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Thử lại
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Danh sách Bệnh nhân</h1>

                {/* Create button */}
                <button
                    onClick={handleCreate}
                    disabled={createPatient.isPending}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {createPatient.isPending ? (
                        <span className="flex items-center">
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Đang tạo...
                        </span>
                    ) : (
                        '+ Thêm bệnh nhân'
                    )}
                </button>
            </div>

            {/* Filters */}
            <div className="mb-4 flex gap-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm bệnh nhân..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="all">Tất cả</option>
                    <option value="active">Đang điều trị</option>
                    <option value="completed">Hoàn thành</option>
                </select>

                <button
                    onClick={() => refetch()}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                    🔄 Làm mới
                </button>
            </div>

            {/* Patient table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {patients && patients.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tên bệnh nhân
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Điện thoại
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Địa chỉ
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {patients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {patient.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{patient.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{patient.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {patient.address}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleDelete(patient.id)}
                                            disabled={deletePatient.isPending}
                                            className="text-red-600 hover:text-red-900 disabled:text-gray-400"
                                        >
                                            {deletePatient.isPending ? 'Đang xóa...' : 'Xóa'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Không có bệnh nhân nào</p>
                    </div>
                )}
            </div>

            {/* Summary */}
            <div className="mt-4 text-sm text-gray-600">
                Tổng số: <span className="font-semibold">{patients?.length || 0}</span> bệnh nhân
            </div>
        </div>
    );
};

export default PatientListExample;

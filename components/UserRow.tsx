"use client";
import { useState } from 'react';
import { User } from '@/lib/types';
import { updateUserStatus } from '@/lib/api';

interface UserRowProps {
  user: User;
  onUpdate?: () => void;
}

export default function UserRow({ user, onUpdate }: UserRowProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: 'active' | 'suspended') => {
    setIsUpdating(true);
    try {
      await updateUserStatus(user.id, newStatus);
      onUpdate?.();
    } catch (error) {
      console.error('Failed to update user status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'business' ? 'bg-blue-400 text-black' : 'bg-green-400 text-black';
  };

  const getTypeText = (type: string) => {
    return type === 'business' ? 'Business' : 'Privato';
  };

  return (
    <tr className="hover:bg-zinc-800">
      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <div className="text-sm font-medium text-gray-200">{user.name}</div>
          <div className="text-sm text-gray-400">{user.email}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(user.type)}`}>
          {getTypeText(user.type)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-200">{user.totalCards}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-200">€{user.totalSpent.toLocaleString()}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-200">
          {new Date(user.lastLogin).toLocaleDateString()}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-200">
          {new Date(user.createdAt).toLocaleDateString()}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex gap-2">
          <button
            onClick={() => handleStatusChange('active')}
            disabled={isUpdating}
            className="text-green-400 hover:text-green-300 disabled:opacity-50"
          >
            Attiva
          </button>
          <button
            onClick={() => handleStatusChange('suspended')}
            disabled={isUpdating}
            className="text-red-400 hover:text-red-300 disabled:opacity-50"
          >
            Sospendi
          </button>
        </div>
      </td>
    </tr>
  );
}

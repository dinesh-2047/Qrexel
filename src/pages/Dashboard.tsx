import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Clock, Link as LinkIcon } from 'lucide-react';
import { useStore } from '../store/useStore';
import { supabase } from '../supabase/client';
import { SavedQRCode } from '../types';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { user } = useStore();
  const navigate = useNavigate();
  const [qrCodes, setQrCodes] = useState<SavedQRCode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    fetchQRCodes();
  }, [user]);

  const fetchQRCodes = async () => {
    try {
      const { data, error } = await supabase
        .from('qr_codes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQrCodes(data);
    } catch (error) {
      toast.error('Failed to fetch QR codes');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Manage your QR codes and view analytics
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Total QR Codes</h3>
            <BarChart className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold">{qrCodes.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Total Scans</h3>
            <LinkIcon className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold">
            {qrCodes.reduce((acc, qr) => acc + qr.scan_count, 0)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Dynamic QR Codes</h3>
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold">
            {qrCodes.filter(qr => qr.is_dynamic).length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent QR Codes</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3">Content</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Created</th>
                  <th className="pb-3">Scans</th>
                  <th className="pb-3">Dynamic</th>
                </tr>
              </thead>
              <tbody>
                {qrCodes.map((qr) => (
                  <tr key={qr.id} className="border-b last:border-0">
                    <td className="py-3">
                      <div className="truncate max-w-xs">
                        {qr.options.data}
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="capitalize">{qr.options.type}</span>
                    </td>
                    <td className="py-3">
                      {new Date(qr.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3">{qr.scan_count}</td>
                    <td className="py-3">
                      {qr.is_dynamic ? (
                        <span className="text-green-600">Yes</span>
                      ) : (
                        <span className="text-gray-600">No</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
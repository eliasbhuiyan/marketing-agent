"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, FileText, Plus } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <Card className="pt-4">
        <CardContent className="space-y-6">
          {/* Current Credits */}
          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 mb-1">Current Credits</p>
                <p className="text-3xl font-bold text-blue-900">2,450</p>
                <p className="text-sm text-blue-600 mt-1">≈ 49 posts remaining</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Buy Credits
              </Button>
            </div>
          </div>

          {/* Purchase Credits */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Purchase Credits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-gray-500">100 credits</p>
                  <p className="text-2xl font-bold">$9</p>
                </div>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  Buy
                </Button>
              </div>
              <div className="border-2 border-blue-500 rounded-lg p-4 flex flex-col justify-between bg-blue-50">
                <div>
                  <p className="text-sm text-blue-600">500 credits</p>
                  <p className="text-2xl font-bold text-blue-900">$39</p>
                  <p className="text-xs text-blue-600">Most popular</p>
                </div>
                <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Buy
                </Button>
              </div>
              <div className="border rounded-lg p-4 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-gray-500">1,000 credits</p>
                  <p className="text-2xl font-bold">$69</p>
                </div>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  Buy
                </Button>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Payment Method</h3>
            <div className="border rounded-lg p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <h4 className="font-medium">Visa ending in 4242</h4>
                  <p className="text-sm text-gray-500">Expires 12/2025</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>
          </div>

          {/* Billing History */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Billing History</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Credits</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Amount</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm">May 1, 2023</td>
                    <td className="px-4 py-3 text-sm">500</td>
                    <td className="px-4 py-3 text-sm">$39.00</td>
                    <td className="px-4 py-3 text-sm">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <FileText className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm">Apr 1, 2023</td>
                    <td className="px-4 py-3 text-sm">500</td>
                    <td className="px-4 py-3 text-sm">$39.00</td>
                    <td className="px-4 py-3 text-sm">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <FileText className="h-4 w-4 mr-1" />
                        PDF
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
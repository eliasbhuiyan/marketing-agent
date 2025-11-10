import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function AffiliateReviewDashboard() {
  const submissions = [
    { id: 1, brand: "Brand A", link: "https://twitter.com/user/status/1", status: "Pending", submittedAt: "2024-07-29" },
    { id: 2, brand: "Brand B", link: "https://facebook.com/user/post/2", status: "Approved", submittedAt: "2024-07-28" },
    { id: 3, brand: "Brand C", link: "https://linkedin.com/feed/update/3", status: "Rejected", submittedAt: "2024-07-27" },
  ];

  return (
    <div className="flex flex-col h-screen  text-white">
      <header className="flex items-center justify-between p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Affiliate Review Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input placeholder="Search by brand or link..." className="pl-10 w-64 bg-gray-800 border-gray-700" />
          </div>
          <Button variant="outline" className="bg-gray-800 border-gray-700">Pending</Button>
          <Button variant="outline" className="bg-gray-800 border-gray-700">Approved</Button>
          <Button variant="outline" className="bg-gray-800 border-gray-700">Rejected</Button>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-400">Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-400">Approved Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-400">Total Credits Given</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">500</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-400">Rejected Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gray-800 border-gray-700 rounded-lg">
          <div className="grid grid-cols-5 p-4 font-semibold border-b border-gray-700">
            <div>Brand</div>
            <div className="col-span-2">Post Link</div>
            <div>Submitted At</div>
            <div className="text-end">Actions</div>
          </div>
          <div>
            {submissions.map((submission) => (
              <div key={submission.id} className="grid grid-cols-5 p-4 items-center border-b border-gray-700">
                <div>{submission.brand}</div>
                <div className="col-span-2">
                  <a href={submission.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    {submission.link}
                  </a>
                </div>
                
                <div>{submission.submittedAt}</div>
                
                <div className="space-x-2 flex justify-end">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                  <Button size="sm" variant="destructive">Reject</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
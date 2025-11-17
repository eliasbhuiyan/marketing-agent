"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import apiClient from "@/lib/api";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function AffiliateReviewDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [openId, setOpenId] = useState(null);
  const [creditsByPost, setCreditsByPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sanitizeLink = (url) => (url || "").replace(/[`]/g, "").trim();

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await apiClient.affiliate.getAllAffiliateLinks(page, limit);
      setSubmissions(res.affiliate || []);
      setPagination(res.pagination || null);
    } catch (e) {
      setSubmissions([]);
      setPagination(null);
      setError(e?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit]);

  const counts = useMemo(() => {
    let pending = 0,
      approved = 0,
      rejected = 0;
    submissions.forEach((item) => {
      item.post?.forEach((p) => {
        if (p.status === "pending") pending += 1;
        else if (p.status === "approved") approved += 1;
        else if (p.status === "rejected") rejected += 1;
      });
    });
    return { pending, approved, rejected };
  }, [submissions]);

  const filteredSubmissions = useMemo(() => {
    const term = search.toLowerCase().trim();
    return submissions
      .map((item) => {
        const posts = (item.post || []).filter((p) => {
          const matchesStatus = statusFilter
            ? p.status === statusFilter
            : true;
          const link = sanitizeLink(p.postlink).toLowerCase();
          const matchesSearch = term
            ? item.brand?.companyName?.toLowerCase().includes(term) ||
            link.includes(term)
            : true;
          return matchesStatus && matchesSearch;
        });
        return { ...item, post: posts };
      })
      .filter((item) => item.post && item.post.length > 0);
  }, [submissions, search, statusFilter]);

  const updateStatus = async (brandId, postId, status) => {
    const credits = Number(creditsByPost[postId]) || 1;
    setLoading(true);
    try {
      await apiClient.affiliate.updateAffiliateLinkStatus(
        brandId,
        postId,
        credits,
        status
      );
      setSubmissions((prev) =>
        prev.map((item) => {
          if (item.brand?._id !== brandId) return item;
          return {
            ...item,
            post: item.post.map((p) =>
              p._id === postId ? { ...p, status } : p
            ),
          };
        })
      );
    } catch (e) {
      setError(e?.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen  text-white">
      <header className="flex items-center justify-between p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Affiliate Review Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by brand or link..."
              className="pl-10 w-64 bg-gray-800 border-gray-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className={`bg-gray-800 border-gray-700 ${statusFilter === "pending" ? "border-blue-500" : ""
              }`}
            onClick={() =>
              setStatusFilter((prev) => (prev === "pending" ? "" : "pending"))
            }
          >
            Pending
          </Button>
          <Button
            variant="outline"
            className={`bg-gray-800 border-gray-700 ${statusFilter === "approved" ? "border-blue-500" : ""
              }`}
            onClick={() =>
              setStatusFilter((prev) =>
                prev === "approved" ? "" : "approved"
              )
            }
          >
            Approved
          </Button>
          <Button
            variant="outline"
            className={`bg-gray-800 border-gray-700 ${statusFilter === "rejected" ? "border-blue-500" : ""
              }`}
            onClick={() =>
              setStatusFilter((prev) =>
                prev === "rejected" ? "" : "rejected"
              )
            }
          >
            Rejected
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-400">Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{counts.pending}</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-400">Approved Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{counts.approved}</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-400">Total Credits Given</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-400">Rejected Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{counts.rejected}</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white/10 border-gray-700 rounded-lg">
          <div className="grid grid-cols-5 p-4 font-semibold border-b border-gray-700">
            <div>Brand</div>
            <div className="col-span-2">Post Link</div>
            <div>Submitted At</div>
            <div className="text-end">Actions</div>
          </div>
          <Card>
            {filteredSubmissions.map((submission) => {
              const isOpen = openId === submission._id;
              return (
                <div key={submission._id} className="">
                  <div className="grid grid-cols-5 p-4 items-center">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1 rounded hover:bg-white/10"
                        onClick={() =>
                          setOpenId((prev) =>
                            prev === submission._id ? null : submission._id
                          )
                        }
                        aria-label={isOpen ? "Collapse" : "Expand"}
                      >
                        {isOpen ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      <span>{submission.brand?.companyName}</span>
                    </div>
                    <div className="col-span-2 text-white/80">
                      {(submission.post?.length || 0)} posts
                    </div>
                    <div>
                      {submission.createdAt
                        ? new Date(submission.createdAt).toLocaleString()
                        : "-"}
                    </div>
                    <div className="text-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setOpenId((prev) =>
                            prev === submission._id ? null : submission._id
                          )
                        }
                      >
                        {isOpen ? "Hide" : "View Posts"}
                      </Button>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="px-4 pb-4">
                      <div className="space-y-3">
                        {submission.post.map((p) => (
                          <div
                            key={p._id}
                            className="grid grid-cols-5 items-center gap-2 rounded bg-gray-900/50 p-3"
                          >
                            <div className="col-span-2">
                              <a
                                href={sanitizeLink(p.postlink)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline break-all"
                              >
                                {sanitizeLink(p.postlink)}
                              </a>
                            </div>
                            <div className="text-sm">
                              <span
                                className={`px-2 py-1 rounded text-xs ${p.status === "approved"
                                    ? "bg-green-700"
                                    : p.status === "rejected"
                                      ? "bg-red-700"
                                      : "bg-yellow-700"
                                  }`}
                              >
                                {p.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                min={1}
                                value={creditsByPost[p._id] || ""}
                                onChange={(e) =>
                                  setCreditsByPost((prev) => ({
                                    ...prev,
                                    [p._id]: e.target.value,
                                  }))
                                }
                                placeholder="Credits"
                                className="w-24 bg-gray-800 border-gray-700"
                              />
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                disabled={loading}
                                onClick={() =>
                                  updateStatus(
                                    submission.brand?._id,
                                    p._id,
                                    "approved"
                                  )
                                }
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                disabled={loading}
                                onClick={() =>
                                  updateStatus(
                                    submission.brand?._id,
                                    p._id,
                                    "rejected"
                                  )
                                }
                              >
                                Reject
                              </Button>
                            </div>
                          </div>
                        ))}
                        {submission.post.length === 0 && (
                          <div className="text-sm text-white/60">
                            No posts match the current filters.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div className="flex items-center justify-between p-4">
              <div className="text-sm text-white/70">
                {pagination
                  ? `Page ${pagination.page} of ${pagination.totalPages}`
                  : ""}
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  disabled={!pagination?.hasPrev || loading}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  disabled={!pagination?.hasNext || loading}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {error && (
          <div className="text-red-400 text-sm">{error}</div>
        )}
      </main>
    </div>
  );
}
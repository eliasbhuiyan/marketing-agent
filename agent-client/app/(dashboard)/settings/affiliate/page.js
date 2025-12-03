"use client";
import ApiError from "@/components/ui/ApiError";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SuccessMessage from "@/components/ui/SuccessMessage";
import apiClient from "@/lib/api";
import { Award, Link, Send } from "lucide-react";
import { useEffect, useState } from "react";
export default function AffiliatePage() {
  const [postLink, setPostLink] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [affiliateLinks, setAffiliateLinks] = useState([]);

  const faqData = [
    {
      question: "How many credits can I earn?",
      answer:
        "You can get 1 approval each month, and each approved post will earn you 50 credits.",
    },
    {
      question: "What kind of posts are accepted?",
      answer:
        "We accept posts on Twitter, Facebook, LinkedIn, and Instagram. The post should be about your experience with MarkgenAI and should be publicly visible.",
    },
    {
      question: "How long does it take to get my submission reviewed?",
      answer:
        "Our team reviews submissions within 48 hours. You will be notified via email once your submission has been reviewed.",
    },
  ];
  const linkValidator = (link) => {
    try {
      new URL(link);
      return true;
    } catch (err) {
      return false;
    }
  };
  const handelPostLink = async () => {
    if (!postLink) return setError("Please enter a post link");
    if (!linkValidator(postLink))
      return setError("Please enter a valid post link");
    try {
      const res = await apiClient.affiliate.postAffiliateLink(postLink);
      setMessage(res.message);
      setPostLink("");
      setTimeout(() => {
        setMessage("");
      }, 4000);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    const data = async () => {
      const res = await apiClient.affiliate.getAffiliateLinks();
      setAffiliateLinks(res.affiliate.post.reverse());
    };
    data();
  }, [message]);

  const latestApproved = affiliateLinks.find((s) => s.status && s.status.toLowerCase() === "approved" || s.status && s.status.toLowerCase() === "pending");
  console.log(latestApproved);
  
  const approvedAt = latestApproved ? new Date(latestApproved.createdAt) : null;
  const nextEligibleDate = approvedAt ? new Date(approvedAt) : null;
  if (nextEligibleDate) { nextEligibleDate.setMonth(nextEligibleDate.getMonth() + 1); }
  const canSubmitNow = !nextEligibleDate || new Date() >= nextEligibleDate;
  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  return (
    <div className="space-y-12">
      <Card className="mx-auto">
        <CardContent className="pt-6">
          <h3 className="text-2xl font-bold text-center text-white">
            Submit Your Post
          </h3>
          <div className="mt-6 space-y-4">
            <div>
              <Label className="text-gray-300">Post Link</Label>
              <Input
                value={postLink}
                onChange={(e) => {
                  setPostLink(e.target.value);
                  setError("");
                }}
                placeholder="https://twitter.com/your-username/status/12345"
                className={`mt-1 ${error ? "border-red-500" : ""}`}
              />
              {error && <ApiError>{error}</ApiError>}
              {message && <SuccessMessage>{message}</SuccessMessage>}
              {latestApproved && (
                <div className={`mt-3 p-3 rounded ${canSubmitNow ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                  <p className="text-sm">
                    Last submit: {formatDate(latestApproved.createdAt)}. {canSubmitNow ? "You can submit another link now." : `You can submit another link after ${nextEligibleDate.toLocaleDateString()}.`}
                  </p>
                </div>
              )}
            </div>
            <Button onClick={handelPostLink} className="w-full" disabled={!canSubmitNow} title={canSubmitNow ? "" : `You can submit after ${nextEligibleDate?.toLocaleDateString()}`}>
              Submit for Review
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="p-12">
        <h2 className="text-3xl font-bold text-center text-white">
          Submission History
        </h2>
        <div className="mt-6 space-y-4">
          {affiliateLinks.length === 0 ? (
            <p className="text-center text-gray-400">
              No affiliate links found.
            </p>
          ) : (
            affiliateLinks.map((submission) => (
              <div
                key={submission._id}
                className="flex items-center justify-between p-4 rounded-lg bg-white/10"
              >
                <div>
                  <p className="font-medium text-white break-all">{submission.postlink}</p>
                  <p className="text-xs text-gray-400 mt-1">Submitted on {formatDate(submission.createdAt)}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                    {
                      approved: "bg-green-500/20 text-green-400",
                      pending: "bg-yellow-500/20 text-yellow-400",
                      rejected: "bg-red-500/20 text-red-400",
                    }[submission.status.toLowerCase()]
                  }`}
                >
                  {submission.status}
                </span>
              </div>
            ))
          )}
        </div>
      </Card>
      <Card className="p-12">
        <h2 className="text-3xl font-bold text-center text-white">
          How It Works
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-500/20 mx-auto mb-4">
              <Send className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">
              1. Create a Post
            </h3>
            <p className="mt-2 text-gray-400">
              Share your experience with MarkgenAI on your favorite social media
              platform.
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-500/20 mx-auto mb-4">
              <Link className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">2. Submit Link</h3>
            <p className="mt-2 text-gray-400">
              Submit the link to your post for our team to review.
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-500/20 mx-auto mb-4">
              <Award className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">
              3. Earn Credits
            </h3>
            <p className="mt-2 text-gray-400">
              Once approved, you&apos;ll receive free credits to use on MarkgenAI.
            </p>
          </div>
        </div>
      </Card>
      <Card className="p-12">
        <h2 className="text-3xl font-bold text-center text-white">
          Frequently Asked Questions
        </h2>
        <div className="mt-6 space-y-4">
          {faqData.map((faq, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-white">
                {faq.question}
              </h3>
              <p className="text-gray-400 mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

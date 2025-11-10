import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Award, Link, Send, DollarSign, Zap, Gift } from "lucide-react";

export default function AffiliatePage() {
  const submissions = [
    { id: 1, link: "https://twitter.com/user/status/1", status: "Approved" },
    { id: 2, link: "https://facebook.com/user/post/2", status: "Pending" },
    { id: 3, link: "https://linkedin.com/feed/update/3", status: "Rejected" },
  ];

  const faqData = [
    {
      question: "How many credits can I earn?",
      answer: "You can earn up to 1000 credits per month. Each approved post is worth 100 credits.",
    },
    {
      question: "What kind of posts are accepted?",
      answer: "We accept posts on Twitter, Facebook, LinkedIn, and Instagram. The post should be about your experience with MarkgenAI and should be publicly visible.",
    },
    {
      question: "How long does it take to get my submission reviewed?",
      answer: "Our team reviews submissions within 3-5 business days. You will be notified via email once your submission has been reviewed.",
    },
  ];

  return (
    <div className="space-y-12">
      <Card className="mx-auto">
        <CardContent className="pt-6">
          <h3 className="text-2xl font-bold text-center text-white">Submit Your Post</h3>
          <form className="mt-6 space-y-4">
            <div>
              <Label htmlFor="post-link" className="text-gray-300">Post Link</Label>
              <Input id="post-link" placeholder="https://twitter.com/your-username/status/12345" className="mt-1" />
            </div>
            <Button type="submit" className="w-full">Submit for Review</Button>
          </form>
        </CardContent>
      </Card>
      <Card className="p-12">
        <h2 className="text-3xl font-bold text-center text-white">Submission History</h2>
        <div className="mt-6 space-y-4">
          {submissions.map((submission) => (
            <div key={submission.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
              <p className="font-medium text-white">{submission.link}</p>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${{
                  Approved: "bg-green-500/20 text-green-400",
                  Pending: "bg-yellow-500/20 text-yellow-400",
                  Rejected: "bg-red-500/20 text-red-400",
                }[submission.status]}`}
              >
                {submission.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-12">
        <h2 className="text-3xl font-bold text-center text-white">How It Works</h2>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-500/20 mx-auto mb-4">
              <Send className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">1. Create a Post</h3>
            <p className="mt-2 text-gray-400">
              Share your experience with MarkgenAI on your favorite social media platform.
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
            <h3 className="text-xl font-semibold text-white">3. Earn Credits</h3>
            <p className="mt-2 text-gray-400">
              Once approved, you'll receive free credits to use on MarkgenAI.
            </p>
          </div>
        </div>
      </Card>
      <Card className="p-12">
        <h2 className="text-3xl font-bold text-center text-white">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-4">
          {faqData.map((faq, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
              <p className="text-gray-400 mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
"use client";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, HandCoins, LinkIcon, Palette, User, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function ContentPage({ children }) {
    const pathname = usePathname();
    const activeTab = pathname.split("/").pop();

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "brand", label: "Brand Kit", icon: Palette },
        { id: "integrations", label: "Integrations", icon: LinkIcon },
        { id: "team", label: "Team", icon: Users },
        { id: "affiliate", label: "Affiliate", icon: HandCoins },
        { id: "billing", label: "Billing", icon: CreditCard },
    ];
    const descriptions = {
        'profile': {
            name: 'Profile Information',
            description: 'Manage your personal information, preferences, and account details to keep your profile up to date.',
        },
        'brand': {
            name: 'Brand Info',
            description: 'Customize your brand colors, fonts, logos, and assets to ensure consistent branding across all content.',
        },
        'integrations': {
            name: 'Integrations',
            description: 'Connect your favorite tools and platforms to streamline your workflow and enhance productivity.',
        },
        'team': {
            name: 'Team Management',
            description: 'Invite team members, assign roles, and collaborate effectively to manage your organization.',
        },
        'affiliate': {
            name: 'Affiliate Program',
            description: 'Join our affiliate program, track referrals, and earn commissions by promoting our platform.',
        },
        'billing': {
            name: 'Billing & Subscription',
            description: 'Manage your subscription, view invoices, update payment methods, and track billing history.',
        },
    }
    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold text-white">{descriptions[activeTab].name}</h1>
                <p className="text-white/80 mt-2 max-w-2xl m-auto">{descriptions[activeTab].description}</p>
            </div>
            <div className="grid grid-cols-4 gap-8 mt-5">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <Card className="overflow-hidden">
                        <CardContent className="p-0 ">
                            <nav className="space-y-1">
                                {tabs.map((tab) => (
                                    <Link
                                        key={tab.id}
                                        href={`/settings/${tab.id}`}
                                        className={`w-full text-white flex items-center px-4 py-3 text-left text-sm font-medium rounded-none ${activeTab === tab.id
                                            ? "bg-white/20 border-r-2 border-blue-700"
                                            : "hover:bg-white/10"
                                            }`}
                                    >
                                        <tab.icon className="h-5 w-5 mr-3" />
                                        {tab.label}
                                    </Link>
                                ))}
                            </nav>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-3">
                    {children}
                </div>
            </div>
        </div>
    );
}

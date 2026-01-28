import { motion } from 'framer-motion';
import { Building2, Bell, Shield, Palette, Globe, HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const settingsSections = [
  {
    icon: Building2,
    title: 'Company Settings',
    description: 'Manage company profile and branches',
    items: ['Company Name', 'Logo', 'Contact Details'],
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Configure alerts and notifications',
    items: ['Email Alerts', 'Payment Reminders', 'Agreement Updates'],
  },
  {
    icon: Shield,
    title: 'Security',
    description: 'Password and access settings',
    items: ['Change Password', 'Two-Factor Auth', 'Active Sessions'],
  },
  {
    icon: Palette,
    title: 'Appearance',
    description: 'Customize the dashboard look',
    items: ['Theme', 'Language', 'Date Format'],
  },
];

export default function Settings() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Settings Cards */}
      <div className="grid gap-6">
        {settingsSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{section.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
                  <div className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <div key={item}>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-sm">{item}</span>
                          {itemIndex === 0 ? (
                            <Button variant="outline" size="sm">Configure</Button>
                          ) : (
                            <Switch />
                          )}
                        </div>
                        {itemIndex < section.items.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Need Help?</h3>
              <p className="text-sm text-muted-foreground">
                Contact our support team for assistance with your account
              </p>
            </div>
            <Button>Contact Support</Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

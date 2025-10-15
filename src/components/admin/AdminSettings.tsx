import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';

export function AdminSettings() {
  return (
    <div className="p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your store settings and preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Store Information */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="mb-6">Store Information</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="storeName">Store Name</Label>
                <Input
                  id="storeName"
                  defaultValue="chodrum"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="storeEmail">Contact Email</Label>
                <Input
                  id="storeEmail"
                  type="email"
                  defaultValue="contact@chodrum.com"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="storePhone">Phone Number</Label>
                <Input
                  id="storePhone"
                  type="tel"
                  defaultValue="+82 10-1234-5678"
                  className="mt-1"
                />
              </div>
            </div>

            <Button className="mt-6">Save Changes</Button>
          </div>

          {/* Payment Settings */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="mb-6">Payment Settings</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4>Credit Card Payments</h4>
                  <p className="text-sm text-muted-foreground">
                    Accept credit and debit cards
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4>Naver Pay</h4>
                  <p className="text-sm text-muted-foreground">
                    Enable Naver Pay integration
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4>Kakao Pay</h4>
                  <p className="text-sm text-muted-foreground">
                    Enable Kakao Pay integration
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4>Bank Transfer</h4>
                  <p className="text-sm text-muted-foreground">
                    Allow bank transfers (무통장입금)
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="mb-6">Notifications</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4>Order Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive email when new orders arrive
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4>Payment Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Get notified about payment status changes
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4>Customer Messages</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive customer inquiry notifications
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="mb-6">Security</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  className="mt-1"
                />
              </div>
            </div>

            <Button className="mt-6">Update Password</Button>
          </div>

        </div>
      </div>

    </div>
  );
}

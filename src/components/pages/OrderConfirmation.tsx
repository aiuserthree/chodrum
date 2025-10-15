import { useCart } from '../../context/CartContext';
import { Button } from '../ui/button';
import { CheckCircle2, Download, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface OrderConfirmationProps {
  orderId: string;
  onNavigate: (page: string) => void;
}

export function OrderConfirmation({ orderId, onNavigate }: OrderConfirmationProps) {
  const { cart, clearCart, getTotalPrice } = useCart();
  const total = getTotalPrice();

  const handleContinueShopping = () => {
    clearCart();
    onNavigate('products');
  };

  const handleGoToDownloads = () => {
    clearCart();
    onNavigate('account');
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
      <div className="max-w-4xl mx-auto px-4 py-8 lg:py-12">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-block p-4 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <CheckCircle2 className="w-16 h-16 lg:w-20 lg:h-20 text-green-600" />
          </div>
          <h1 className="mb-3">Payment Successful!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-lg p-6 mb-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 pb-6 border-b border-border">
            <div>
              <h2 className="mb-1">Order Number</h2>
              <p className="text-muted-foreground">{orderId}</p>
            </div>
            <div className="mt-4 lg:mt-0 text-left lg:text-right">
              <h2 className="mb-1">Total Amount</h2>
              <p className="text-primary">₩{total.toLocaleString()}</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <p className="text-muted-foreground">
                A confirmation email has been sent to your email address
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="mb-4">Your Downloads</h3>
            {cart.map(({ product }) => (
              <div
                key={product.id}
                className="flex gap-4 p-4 bg-secondary/50 rounded-lg"
              >
                <div className="w-16 h-16 rounded overflow-hidden bg-muted flex-shrink-0">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="truncate mb-1">{product.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {product.composer}
                  </p>
                  <Button size="sm" className="w-full lg:w-auto">
                    <Download className="w-4 h-4 mr-2" />
                    PDF 다운로드
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          <Button
            size="lg"
            onClick={handleGoToDownloads}
            className="w-full min-h-[48px]"
          >
            내 다운로드로 이동
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handleContinueShopping}
            className="w-full min-h-[48px]"
          >
            계속 쇼핑하기
          </Button>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-6 bg-card border border-border rounded-lg"
        >
          <h3 className="mb-4">What's Next?</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-600" />
              <span>Your downloads are available immediately and can be accessed from your account</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-600" />
              <span>You can re-download your purchases anytime from the "My Account" page</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-600" />
              <span>If you have any questions, please contact our customer service</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

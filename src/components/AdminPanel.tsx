// // import React, { useState, useEffect } from 'react';
// // import { Button } from '@/components/ui/button';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Badge } from '@/components/ui/badge';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // import { 
// //   BarChart3, 
// //   LineChart, 
// //   MapPin, 
// //   Package, 
// //   TrendingUp, 
// //   CheckCircle, 
// //   Clock, 
// //   DollarSign,
// //   Users,
// //   ShoppingBag,
// //   Activity
// // } from 'lucide-react';
// // import { useToast } from '@/hooks/use-toast';
// // import { AnalyticsCard } from '@/components/AnalyticsCard';

// // // Data from the original application
// // const NODE_TYPE_MAP = {
// //   "Walmart Store": Array.from({length: 8149}, (_, i) => `WM_${i + 1001}`),
// //   "Fulfillment Center": Array.from({length: 15}, (_, i) => `FC_MW${String(i + 1).padStart(2, '0')}`),
// //   "Dark Store": [
// //     ...Array.from({length: 10}, (_, i) => `DS_ATL${String(i + 1).padStart(2, '0')}`),
// //     ...Array.from({length: 10}, (_, i) => `DS_SJ${String(i + 1).padStart(2, '0')}`)
// //   ]
// // };

// // const CATEGORY_OPTIONS = [
// //   "Beverages", "Pet Supplies", "Grocery", "Electronics", "Home", 
// //   "Toys", "Clothing", "Automotive", "Pharma", "Bakery", "Produce"
// // ];

// // const SAMPLE_PRODUCTS = {
// //   "Beverages": [
// //     "Aquafina 12 Pack Iced Tea",
// //     "Coca-Cola 12 Pack Cans",
// //     "Dr Pepper 12 Pack Cans",
// //     "Great Value Apple Juice 1 Gallon",
// //     "Great Value Orange Juice 1 Gallon",
// //     "Lipton 12 Pack Iced Tea",
// //     "Lipton 24 Pack Water",
// //     "Pepsi 12 Pack Cans"
// // ],
// // "Pet Supplies": [
// //     "Great Value Cat Litter 10 oz",
// //     "Great Value Cat Litter 25 lb",
// //     "Great Value Pet Treats 25 lb",
// //     "Kong Dog Toy",
// //     "Nylabone Dog Toy",
// //     "Pedigree Cat Food 15 lb",
// //     "Pedigree Dog Food 15 lb",
// //     "Pedigree Dog Food 20 lb",
// //     "Purina Cat Food 15 lb",
// //     "Purina Cat Food 20 lb",
// //     "Purina Dog Food 15 lb",
// //     "Purina Dog Food 20 lb"
// // ],
// // "Bakery": [
// //     "Great Value Bagels 12-pack",
// //     "Great Value Bread Sourdough 20 oz",
// //     "Great Value Bread White 20 oz",
// //     "Great Value Donuts 12-pack",
// //     "Great Value Donuts 6-pack",
// //     "Great Value Muffins 12-pack",
// //     "Great Value Muffins 6-pack",
// //     "Wonder Bread Sourdough 20 oz",
// //     "Wonder Bread Wheat 20 oz",
// //     "Wonder Bread White 20 oz"
// // ],
// // "Produce": [
// //     "Apples 1 lb container",
// //     "Apples per lb",
// //     "Bananas 1 lb container",
// //     "Bananas per lb",
// //     "Blueberries 1 lb container",
// //     "Carrots per lb",
// //     "Kale 1 head",
// //     "Kale 5 oz bag",
// //     "Lettuce 1 head",
// //     "Lettuce 5 oz bag",
// //     "Oranges 1 lb container",
// //     "Oranges per lb",
// //     "Potatoes 5 lb bag",
// //     "Potatoes per lb",
// //     "Spinach 1 head",
// //     "Spinach 5 oz bag",
// //     "Strawberries 1 lb container",
// //     "Strawberries per lb",
// //     "Sweet Potatoes 5 lb bag"
// // ],
// // "Pharma": [
// //     "Advil Allergy Relief 100 ct",
// //     "Advil Pain Reliever 50 ct",
// //     "Band-Aid Adhesive Bandages 60 ct",
// //     "Colgate Toothpaste 6 oz",
// //     "Crest Toothpaste 6 oz",
// //     "Dove Deodorant 4-pack",
// //     "Dove Razor Blades 13.5 oz",
// //     "Gerber Baby Food 8 oz",
// //     "Gerber Cereal 8 oz",
// //     "Gillette Deodorant 13.5 oz",
// //     "Gillette Razor Blades 4-pack",
// //     "Great Value Baby Formula 24 oz",
// //     "Great Value Baby Formula 800 ct",
// //     "Great Value Baby Wipes 800 ct",
// //     "Great Value Conditioner 20 oz",
// //     "Great Value Shampoo 20 oz",
// //     "Great Value Supplements Multivitamin 120 ct",
// //     "Great Value Supplements Omega-3 120 ct",
// //     "Great Value Vitamins Multivitamin 120 ct",
// //     "Great Value Vitamins Omega-3 120 ct",
// //     "Huggies Diapers Size 3 120 ct",
// //     "Huggies Diapers Size 5 100 ct",
// //     "Huggies Diapers Size 5 120 ct",
// //     "Old Spice Body Wash 4-pack",
// //     "Old Spice Razor Blades 4-pack",
// //     "Pampers Diapers Size 3 120 ct",
// //     "Pampers Diapers Size 5 100 ct",
// //     "Tylenol Allergy Relief 100 ct",
// //     "Tylenol Pain Reliever 50 ct",
// //     "Zyrtec Allergy Relief 50 ct",
// //     "Zyrtec Pain Reliever 50 ct"
// // ],
// // "Grocery": [
// //     "Campbell's Chicken Noodle Soup 19 oz",
// //     "Campbell's Vegetable Soup 19 oz",
// //     "Chicken Breast 80/20 per lb",
// //     "Chicken Breast Boneless per lb",
// //     "Great Value 2% Milk 1 Gallon",
// //     "Great Value 2% Milk Half Gallon",
// //     "Great Value Bacon 12 oz",
// //     "Great Value Beans 10.5 oz",
// //     "Great Value Beans 15 oz",
// //     "Great Value Brownies 12 oz",
// //     "Great Value Canned Fruit 15 oz",
// //     "Great Value Cereal 16 oz",
// //     "Great Value Cereal 2 lb",
// //     "Great Value Cheddar Cheese 16 oz",
// //     "Great Value Cheddar Cheese 8 oz",
// //     "Great Value Chicken Nuggets 16 oz",
// //     "Great Value Chicken Nuggets 48 oz",
// //     "Great Value Cookies 12 oz",
// //     "Great Value Flour 5 lb",
// //     "Great Value Frozen Vegetables 12 oz",
// //     "Great Value Greek Yogurt 32 oz",
// //     "Great Value Greek Yogurt 6 oz 4-pack",
// //     "Great Value Ice Cream 16 oz",
// //     "Great Value Ice Cream 32 oz",
// //     "Great Value Mozzarella Cheese 8 oz",
// //     "Great Value Pasta 2 lb",
// //     "Great Value Pasta 32 oz",
// //     "Great Value Pizza 16 oz",
// //     "Great Value Pizza 32 oz",
// //     "Great Value Pizza 48 oz",
// //     "Great Value Rice 16 oz",
// //     "Great Value Rice 2 lb",
// //     "Great Value Sausage 12 oz",
// //     "Great Value Skim Milk 1 Gallon",
// //     "Great Value Soup 10.5 oz",
// //     "Great Value Yogurt 6 oz 4-pack",
// //     "Ground Beef Boneless per lb",
// //     "Kelloggs Corn Flakes 18 oz",
// //     "Kelloggs Oats 18 oz",
// //     "Lean Cuisine Lasagna 10.5 oz",
// //     "Lean Cuisine Mac & Cheese 10.5 oz",
// //     "Pork Chops Boneless per lb",
// //     "Progresso Chicken Noodle Soup 19 oz",
// //     "Progresso Vegetable Soup 19 oz",
// //     "Quaker Corn Flakes 18 oz",
// //     "Quaker Oats 18 oz",
// //     "Salmon Fillet per lb",
// //     "Stouffer's Lasagna 10.5 oz",
// //     "Stouffer's Mac & Cheese 10.5 oz",
// //     "Tilapia Fillet per lb"
// // ],
// // "Automotive": [
// //     "Armor All Tire Shine 16 oz",
// //     "Castrol Motor Oil 5W-20 5 qt",
// //     "Great Value Car Wash 64 oz",
// //     "Great Value Wiper Fluid 64 oz",
// //     "Mobil 1 Motor Oil 5W-20 5 qt",
// //     "Mobil 1 Motor Oil 5W-30 5 qt"
// // ],
// // "Home": [
// //     "All Laundry Detergent 92 fl oz",
// //     "Angel Soft Toilet Paper 18 rolls",
// //     "Charmin Toilet Paper 18 rolls",
// //     "Charmin Toilet Paper 24 rolls",
// //     "Coleman Cooler 4-person",
// //     "Coleman Cooler 50 qt",
// //     "Coleman Tent 50 qt",
// //     "Gain Laundry Detergent 100 fl oz",
// //     "Gain Laundry Detergent 92 fl oz",
// //     "Great Value All-Purpose Cleaner 28 oz",
// //     "Great Value All-Purpose Cleaner 32 oz",
// //     "Great Value Bed Sheets 4-pack",
// //     "Great Value Bed Sheets Queen Size",
// //     "Great Value Dish Soap 28 oz",
// //     "Great Value Dish Soap 32 oz",
// //     "Great Value Pans & Pans Set",
// //     "Great Value Pots & Pans Set",
// //     "Great Value Towels 4-pack",
// //     "Great Value Towels Queen Size",
// //     "Instant Pot Air Fryer",
// //     "Instant Pot Pressure Cooker",
// //     "Instant Pot Stand Mixer",
// //     "KitchenAid Air Fryer",
// //     "KitchenAid Pressure Cooker",
// //     "KitchenAid Stand Mixer",
// //     "Ninja Pressure Cooker",
// //     "Ozark Trail Tent 4-person",
// //     "Ozark Trail Tent 50 qt",
// //     "Tide Laundry Detergent 100 fl oz"
// // ],
// // "Toys": [
// //     "Barbie Blaster",
// //     "Barbie Building Set",
// //     "Great Value Basketball",
// //     "Great Value Board Game 1000 pieces",
// //     "Great Value Board Game Family",
// //     "Great Value Puzzle 1000 pieces",
// //     "Great Value Puzzle Family",
// //     "Great Value Soccer Ball",
// //     "Hot Wheels Car Set 5-pack",
// //     "Huffy Bicycle Accessories",
// //     "LEGO Blaster",
// //     "LEGO Building Set",
// //     "LEGO Doll",
// //     "Nerf Blaster",
// //     "Nerf Building Set",
// //     "Nerf Doll",
// //     "Schwinn Bicycle Accessories"
// // ],
// // "Electronics": [
// //     "Apple Laptop Core i5",
// //     "Apple MacBook Core i5",
// //     "Apple MacBook Core i7",
// //     "Apple MacBook M2",
// //     "Dell Laptop Core i7",
// //     "Dell Laptop M2",
// //     "Google Pixel 8 128GB",
// //     "Google Pixel 8 256GB",
// //     "HP MacBook M2",
// //     "LG 55\" 4K Smart TV",
// //     "LG 65\" 4K Smart TV",
// //     "LG 75\" 4K Smart TV",
// //     "Samsung 55\" 4K Smart TV",
// //     "TCL 75\" 4K Smart TV",
// //     "iPhone 15 128GB"
// // ],
// // "Clothing": [
// //     "Adidas Hoodie",
// //     "Adidas Running Shoes",
// //     "Great Value Socks 3-pack",
// //     "Great Value Socks 6-pack",
// //     "Great Value T-Shirt 3-pack",
// //     "Great Value T-Shirt 6-pack",
// //     "Hanes 501 Jeans Men",
// //     "Hanes 501 Jeans s",
// //     "Hanes Slim Fit Shirt s",
// //     "Levis 501 Jeans s",
// //     "Levis Slim Fit Shirt Men",
// //     "Nike Running Shoes",
// //     "Wrangler 501 Jeans Men",
// //     "Wrangler Slim Fit Shirt Women",
// //     "Wrangler Slim Fit Shirt s"
// // ]
// // };

// // interface OrderResult {
// //   status: string;
// //   top_combinations: Array<{
// //     nodes: string[];
// //     total_cost: number;
// //     sku_mapping: Record<string, string[]>;
// //   }>;
// // }

// // interface AdminPanelProps {
// //   orderResults: OrderResult | null;
// //   onAcceptOrder: (orderData: any) => void;
// //   acceptedOrders: any[];
// // }

// // export const AdminPanel: React.FC<AdminPanelProps> = ({ orderResults, onAcceptOrder, acceptedOrders }) => {
// //   const [selectedNodeType, setSelectedNodeType] = useState<string>('Walmart Store');
// //   const [selectedNodeId, setSelectedNodeId] = useState<string>('');
// //   const [selectedCategory, setSelectedCategory] = useState<string>('Beverages');
// //   const [selectedProduct, setSelectedProduct] = useState<string>('');
// //   const [slaType, setSlaType] = useState<string>('same-day');
// //   const [selectedDate, setSelectedDate] = useState<string>('');
// //   const [selectedTime, setSelectedTime] = useState<string>('');
// //   const [prediction, setPrediction] = useState<number | null>(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const { toast } = useToast();

// //   const generateSKU = (category: string, productIndex: number): string => {
// //     return `SKU_${category.slice(0, 3).toUpperCase()}_${String(productIndex + 1).padStart(3, '0')}`;
// //   };

// //   const predictDemand = async () => {
// //     if (!selectedNodeId || !selectedProduct || !selectedDate || !selectedTime) {
// //       toast({
// //         title: "Missing Fields",
// //         description: "Please fill all required fields for prediction",
// //         variant: "destructive",
// //       });
// //       return;
// //     }
// //     setIsLoading(true);
// //     try {
// //       const datetime = new Date(`${selectedDate}T${selectedTime}`);
// //       const products = SAMPLE_PRODUCTS[selectedCategory as keyof typeof SAMPLE_PRODUCTS] || [];
// //       const productIndex = products.indexOf(selectedProduct);
// //       if (productIndex === -1) {
// //         toast({
// //           title: "Product Error",
// //           description: "Selected product not found in the category list. Please select a valid product.",
// //           variant: "destructive",
// //         });
// //         setIsLoading(false);
// //         return;
// //       }
// //       const skuId = generateSKU(selectedCategory, productIndex);
// //       const payload = {
// //         node_id: selectedNodeId,
// //         SKU_id: skuId,
// //         SLA_type: slaType,
// //         node_type: selectedNodeType,
// //         day: datetime.getDate(),
// //         hour: datetime.getHours(),
// //         weekday: datetime.getDay(),
// //         month: datetime.getMonth() + 1
// //       };
// //       const response = await fetch('http://localhost:5000/predict_demand', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(payload),
// //       });
// //       const result = await response.json();
// //       if (result.status === 'success') {
// //         setPrediction(result.prediction);
// //         toast({
// //           title: "Prediction Complete",
// //           description: `Predicted demand: ${result.prediction} units`,
// //         });
// //       } else {
// //         toast({
// //           title: "Prediction Failed",
// //           description: result.message || 'Failed to get prediction',
// //           variant: "destructive",
// //         });
// //       }
// //     } catch (error) {
// //       toast({
// //         title: "Prediction Failed",
// //         description: "Failed to connect to prediction service",
// //         variant: "destructive",
// //       });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const acceptOrder = (orderOption: any) => {
// //     onAcceptOrder({ ...orderOption, acceptedAt: new Date() });
// //     toast({
// //       title: "Order Accepted",
// //       description: "Order has been accepted and forwarded to fulfillment",
// //     });
// //   };

// //   const availableNodeIds = NODE_TYPE_MAP[selectedNodeType as keyof typeof NODE_TYPE_MAP] || [];
// //   const availableProducts = SAMPLE_PRODUCTS[selectedCategory as keyof typeof SAMPLE_PRODUCTS] || [];

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
// //       {/* Header */}
// //       <header className="glass-card border-0 border-b border-glass-border rounded-none backdrop-blur-xl">
// //         <div className="container mx-auto px-6 py-4">
// //           <div className="flex items-center space-x-4">
// //             <div className="bg-gradient-walmart p-3 rounded-xl animate-pulse-glow">
// //               <Users className="w-6 h-6 text-foreground" />
// //             </div>
// //             <div>
// //               <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
// //                 Walmart Admin Portal
// //               </h1>
// //               <p className="text-muted-foreground text-sm">Order Management & Analytics</p>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="container mx-auto px-6 py-8">
// //         {/* Dashboard Overview */}
// //         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
// //           <Card className="glass-card hover-lift">
// //             <CardContent className="p-6">
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-sm text-muted-foreground">Total Orders</p>
// //                   <p className="text-2xl font-bold text-primary">{acceptedOrders.length}</p>
// //                 </div>
// //                 <ShoppingBag className="w-8 h-8 text-primary" />
// //               </div>
// //             </CardContent>
// //           </Card>

// //           <Card className="glass-card hover-lift">
// //             <CardContent className="p-6">
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-sm text-muted-foreground">Pending Orders</p>
// //                   <p className="text-2xl font-bold text-walmart-yellow">
// //                     {orderResults?.top_combinations?.length || 0}
// //                   </p>
// //                 </div>
// //                 <Clock className="w-8 h-8 text-walmart-yellow" />
// //               </div>
// //             </CardContent>
// //           </Card>

// //           <Card className="glass-card hover-lift">
// //             <CardContent className="p-6">
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-sm text-muted-foreground">Revenue</p>
// //                   <p className="text-2xl font-bold text-success">
// //                     ${acceptedOrders.reduce((sum, order) => sum + order.total_cost, 0).toFixed(2)}
// //                   </p>
// //                 </div>
// //                 <DollarSign className="w-8 h-8 text-success" />
// //               </div>
// //             </CardContent>
// //           </Card>

// //           <Card className="glass-card hover-lift">
// //             <CardContent className="p-6">
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-sm text-muted-foreground">Efficiency</p>
// //                   <p className="text-2xl font-bold text-primary">94.2%</p>
// //                 </div>
// //                 <Activity className="w-8 h-8 text-primary" />
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>

// //         <Tabs defaultValue="orders" className="space-y-6">
// //           <TabsList className="grid w-full grid-cols-2 glass-card">
// //             <TabsTrigger value="orders" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
// //               Order Management
// //             </TabsTrigger>
// //             <TabsTrigger value="prediction" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
// //               Demand Prediction
// //             </TabsTrigger>
// //           </TabsList>

// //           {/* Order Management Tab */}
// //           <TabsContent value="orders" className="space-y-6">
// //             {orderResults && orderResults.top_combinations?.length > 0 ? (
// //               <div className="space-y-6">
// //                 <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
// //                   Pending Order Processing
// //                 </h2>
// //                 {orderResults.top_combinations.map((option, index) => (
// //                   <Card key={index} className="glass-card animate-slide-up hover-lift">
// //                     <CardHeader>
// //                       <CardTitle className="flex items-center justify-between">
// //                         <span className="flex items-center gap-2">
// //                           <Package className="w-5 h-5 text-primary" />
// //                           Option {index + 1}
// //                         </span>
// //                         <Badge variant="secondary" className="text-lg font-bold">
// //                           ${option.total_cost.toFixed(2)}
// //                         </Badge>
// //                       </CardTitle>
// //                     </CardHeader>
// //                     <CardContent className="space-y-4">
// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                         <div>
// //                           <h4 className="font-semibold text-primary mb-2">Fulfillment Nodes</h4>
// //                           <div className="space-y-2">
// //                             {option.nodes.map((node) => (
// //                               <div key={node} className="flex items-center gap-2 p-2 bg-muted/20 rounded-lg">
// //                                 <MapPin className="w-4 h-4 text-primary" />
// //                                 <span className="text-sm font-medium">{node}</span>
// //                               </div>
// //                             ))}
// //                           </div>
// //                         </div>
// //                         <div>
// //                           <h4 className="font-semibold text-primary mb-2">SKU Distribution</h4>
// //                           <div className="space-y-2">
// //                             {Object.entries(option.sku_mapping).map(([nodeId, skus]) => (
// //                               <div key={nodeId} className="p-2 bg-muted/20 rounded-lg">
// //                                 <p className="text-sm font-medium text-primary">{nodeId}</p>
// //                                 <p className="text-xs text-muted-foreground">
// //                                   {Array.isArray(skus) ? skus.join(', ') : skus}
// //                                 </p>
// //                               </div>
// //                             ))}
// //                           </div>
// //                         </div>
// //                       </div>
// //                       <div className="flex justify-end">
// //                         <Button
// //                           variant="walmart-primary"
// //                           onClick={() => acceptOrder(option)}
// //                           className="flex items-center gap-2"
// //                         >
// //                           <CheckCircle className="w-4 h-4" />
// //                           Accept Order
// //                         </Button>
// //                       </div>
// //                     </CardContent>
// //                   </Card>
// //                 ))}
// //               </div>
// //             ) : (
// //               <Card className="glass-card">
// //                 <CardContent className="p-8 text-center">
// //                   <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
// //                   <h3 className="text-lg font-semibold text-muted-foreground mb-2">No Pending Orders</h3>
// //                   <p className="text-muted-foreground">Orders from customers will appear here for processing</p>
// //                 </CardContent>
// //               </Card>
// //             )}

// //             {/* Accepted Orders */}
// //             {acceptedOrders.length > 0 && (
// //               <div className="space-y-4">
// //                 <h3 className="text-xl font-bold text-success">Accepted Orders</h3>
// //                 {acceptedOrders.map((order, index) => (
// //                   <Card key={index} className="glass-card border-success/20">
// //                     <CardContent className="p-4">
// //                       <div className="flex items-center justify-between">
// //                         <div className="flex items-center gap-3">
// //                           <CheckCircle className="w-5 h-5 text-success" />
// //                           <div>
// //                             <p className="font-medium">Order {index + 1}</p>
// //                             <p className="text-sm text-muted-foreground">
// //                               Accepted at: {order.acceptedAt.toLocaleTimeString()}
// //                             </p>
// //                           </div>
// //                         </div>
// //                         <Badge variant="secondary">${order.total_cost.toFixed(2)}</Badge>
// //                       </div>
// //                     </CardContent>
// //                   </Card>
// //                 ))}
// //               </div>
// //             )}
// //           </TabsContent>

// //           {/* Demand Prediction Tab */}
// //           <TabsContent value="prediction" className="space-y-6">
// //             <Card className="glass-card">
// //               <CardHeader>
// //                 <CardTitle className="flex items-center gap-2">
// //                   <TrendingUp className="w-6 h-6 text-primary" />
// //                   Demand Prediction Tool
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-6">
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   <div className="space-y-4">
// //                     <div>
// //                       <Label htmlFor="nodeType">Node Type</Label>
// //                       <Select value={selectedNodeType} onValueChange={setSelectedNodeType}>
// //                         <SelectTrigger className="bg-glass-bg border-glass-border">
// //                           <SelectValue />
// //                         </SelectTrigger>
// //                         <SelectContent>
// //                           {Object.keys(NODE_TYPE_MAP).map((type) => (
// //                             <SelectItem key={type} value={type}>{type}</SelectItem>
// //                           ))}
// //                         </SelectContent>
// //                       </Select>
// //                     </div>

// //                     <div>
// //                       <Label htmlFor="nodeId">Node ID</Label>
// //                       <Select value={selectedNodeId} onValueChange={setSelectedNodeId}>
// //                         <SelectTrigger className="bg-glass-bg border-glass-border">
// //                           <SelectValue placeholder="Select Node ID" />
// //                         </SelectTrigger>
// //                         <SelectContent>
// //                           {availableNodeIds.slice(0, 20).map((nodeId) => (
// //                             <SelectItem key={nodeId} value={nodeId}>{nodeId}</SelectItem>
// //                           ))}
// //                         </SelectContent>
// //                       </Select>
// //                     </div>

// //                     <div>
// //                       <Label htmlFor="category">Product Category</Label>
// //                       <Select value={selectedCategory} onValueChange={setSelectedCategory}>
// //                         <SelectTrigger className="bg-glass-bg border-glass-border">
// //                           <SelectValue />
// //                         </SelectTrigger>
// //                         <SelectContent>
// //                           {CATEGORY_OPTIONS.map((category) => (
// //                             <SelectItem key={category} value={category}>{category}</SelectItem>
// //                           ))}
// //                         </SelectContent>
// //                       </Select>
// //                     </div>

// //                     <div>
// //                       <Label htmlFor="product">Product</Label>
// //                       <Select value={selectedProduct} onValueChange={setSelectedProduct}>
// //                         <SelectTrigger className="bg-glass-bg border-glass-border">
// //                           <SelectValue placeholder="Select Product" />
// //                         </SelectTrigger>
// //                         <SelectContent>
// //                           {availableProducts.map((product) => (
// //                             <SelectItem key={product} value={product}>{product}</SelectItem>
// //                           ))}
// //                         </SelectContent>
// //                       </Select>
// //                     </div>
// //                   </div>

// //                   <div className="space-y-4">
// //                     <div>
// //                       <Label htmlFor="sla">SLA Type</Label>
// //                       <Select value={slaType} onValueChange={setSlaType}>
// //                         <SelectTrigger className="bg-glass-bg border-glass-border">
// //                           <SelectValue />
// //                         </SelectTrigger>
// //                         <SelectContent>
// //                           <SelectItem value="same-day">Same Day</SelectItem>
// //                           <SelectItem value="next-day">Next Day</SelectItem>
// //                           <SelectItem value="two-day">Two Day</SelectItem>
// //                         </SelectContent>
// //                       </Select>
// //                     </div>

// //                     <div>
// //                       <Label htmlFor="date">Date</Label>
// //                       <Input
// //                         type="date"
// //                         value={selectedDate}
// //                         onChange={(e) => setSelectedDate(e.target.value)}
// //                         className="bg-glass-bg border-glass-border"
// //                       />
// //                     </div>

// //                     <div>
// //                       <Label htmlFor="time">Time</Label>
// //                       <Input
// //                         type="time"
// //                         value={selectedTime}
// //                         onChange={(e) => setSelectedTime(e.target.value)}
// //                         className="bg-glass-bg border-glass-border"
// //                       />
// //                     </div>

// //                     <Button
// //                       variant="walmart-primary"
// //                       size="lg"
// //                       onClick={predictDemand}
// //                       disabled={isLoading}
// //                       className="w-full"
// //                     >
// //                       {isLoading ? 'Predicting...' : 'Predict Demand'}
// //                     </Button>
// //                   </div>
// //                 </div>

// //                 {/* Prediction Results with Enhanced Analytics */}
// //                 {prediction !== null && (
// //                   <div className="space-y-6 animate-slide-up">
// //                     <Card className="glass-card border-success/20">
// //                       <CardContent className="p-6">
// //                         <div className="text-center">
// //                           <TrendingUp className="w-12 h-12 text-success mx-auto mb-4" />
// //                           <h3 className="text-2xl font-bold text-success mb-2">
// //                             Predicted Demand: {prediction} units
// //                           </h3>
// //                           <p className="text-muted-foreground">
// //                             Based on historical data and current parameters
// //                           </p>
// //                         </div>
// //                       </CardContent>
// //                     </Card>

// //                     {/* Enhanced Analytics Grid */}
// //                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //                       <AnalyticsCard 
// //                         data={{
// //                           title: "Historical Average",
// //                           value: Math.max(1, prediction - 2),
// //                           unit: "units",
// //                           trend: "neutral",
// //                           chartData: [prediction - 3, prediction - 2, prediction - 1, prediction - 2, prediction]
// //                         }}
// //                       />
// //                       <AnalyticsCard 
// //                         data={{
// //                           title: "Current Prediction",
// //                           value: prediction,
// //                           unit: "units",
// //                           trend: "up",
// //                           trendValue: 12,
// //                           chartData: [prediction - 5, prediction - 3, prediction - 1, prediction + 1, prediction]
// //                         }}
// //                       />
// //                       <AnalyticsCard 
// //                         data={{
// //                           title: "Confidence Score",
// //                           value: 92,
// //                           unit: "%",
// //                           trend: "up",
// //                           trendValue: 5,
// //                           chartData: [88, 90, 91, 92, 92]
// //                         }}
// //                       />
// //                     </div>

// //                     {/* Additional Analytics */}
// //                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //                       <AnalyticsCard 
// //                         data={{
// //                           title: "Peak Demand Window",
// //                           value: new Date(`${selectedDate}T${selectedTime}`).getHours(),
// //                           unit: ":00 - " + (new Date(`${selectedDate}T${selectedTime}`).getHours() + 2) + ":00",
// //                           trend: "up",
// //                           trendValue: 15
// //                         }}
// //                       />
// //                       <AnalyticsCard 
// //                         data={{
// //                           title: "Inventory Recommendation",
// //                           value: Math.ceil(prediction * 1.2),
// //                           unit: "units",
// //                           trend: "up",
// //                           trendValue: 20,
// //                           chartData: [prediction, prediction * 1.1, prediction * 1.15, prediction * 1.2, prediction * 1.2]
// //                         }}
// //                       />
// //                     </div>
// //                   </div>
// //                 )}
// //               </CardContent>
// //             </Card>
// //           </TabsContent>
// //         </Tabs>
// //       </div>
// //     </div>
// //   );
// // };

// import React, { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { 
//   BarChart3, 
//   LineChart, 
//   MapPin, 
//   Package, 
//   TrendingUp, 
//   CheckCircle, 
//   Clock, 
//   DollarSign,
//   Users,
//   ShoppingBag,
//   Activity
// } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import { AnalyticsCard } from '@/components/AnalyticsCard';

// // Data from the original application
// const NODE_TYPE_MAP = {
//   "Walmart Store": Array.from({length: 8149}, (_, i) => `WM_${i + 1001}`),
//   "Fulfillment Center": Array.from({length: 15}, (_, i) => `FC_MW${String(i + 1).padStart(2, '0')}`),
//   "Dark Store": [
//     ...Array.from({length: 10}, (_, i) => `DS_ATL${String(i + 1).padStart(2, '0')}`),
//     ...Array.from({length: 10}, (_, i) => `DS_SJ${String(i + 1).padStart(2, '0')}`)
//   ]
// };

// const CATEGORY_OPTIONS = [
//   "Beverages", "Pet Supplies", "Grocery", "Electronics", "Home", 
//   "Toys", "Clothing", "Automotive", "Pharma", "Bakery", "Produce"
// ];

// const SAMPLE_PRODUCTS = {
//   "Beverages": [
//     "Aquafina 12 Pack Iced Tea",
//     "Coca-Cola 12 Pack Cans",
//     "Dr Pepper 12 Pack Cans",
//     "Great Value Apple Juice 1 Gallon",
//     "Great Value Orange Juice 1 Gallon",
//     "Lipton 12 Pack Iced Tea",
//     "Lipton 24 Pack Water",
//     "Pepsi 12 Pack Cans"
//   ],
//   "Pet Supplies": [
//     "Great Value Cat Litter 10 oz",
//     "Great Value Cat Litter 25 lb",
//     "Great Value Pet Treats 25 lb",
//     "Kong Dog Toy",
//     "Nylabone Dog Toy",
//     "Pedigree Cat Food 15 lb",
//     "Pedigree Dog Food 15 lb",
//     "Pedigree Dog Food 20 lb",
//     "Purina Cat Food 15 lb",
//     "Purina Cat Food 20 lb",
//     "Purina Dog Food 15 lb",
//     "Purina Dog Food 20 lb"
//   ],
//   "Bakery": [
//     "Great Value Bagels 12-pack",
//     "Great Value Bread Sourdough 20 oz",
//     "Great Value Bread White 20 oz",
//     "Great Value Donuts 12-pack",
//     "Great Value Donuts 6-pack",
//     "Great Value Muffins 12-pack",
//     "Great Value Muffins 6-pack",
//     "Wonder Bread Sourdough 20 oz",
//     "Wonder Bread Wheat 20 oz",
//     "Wonder Bread White 20 oz"
//   ],
//   "Produce": [
//     "Apples 1 lb container",
//     "Apples per lb",
//     "Bananas 1 lb container",
//     "Bananas per lb",
//     "Blueberries 1 lb container",
//     "Carrots per lb",
//     "Kale 1 head",
//     "Kale 5 oz bag",
//     "Lettuce 1 head",
//     "Lettuce 5 oz bag",
//     "Oranges 1 lb container",
//     "Oranges per lb",
//     "Potatoes 5 lb bag",
//     "Potatoes per lb",
//     "Spinach 1 head",
//     "Spinach 5 oz bag",
//     "Strawberries 1 lb container",
//     "Strawberries per lb",
//     "Sweet Potatoes 5 lb bag"
//   ],
//   "Pharma": [
//     "Advil Allergy Relief 100 ct",
//     "Advil Pain Reliever 50 ct",
//     "Band-Aid Adhesive Bandages 60 ct",
//     "Colgate Toothpaste 6 oz",
//     "Crest Toothpaste 6 oz",
//     "Dove Deodorant 4-pack",
//     "Dove Razor Blades 13.5 oz",
//     "Gerber Baby Food 8 oz",
//     "Gerber Cereal 8 oz",
//     "Gillette Deodorant 13.5 oz",
//     "Gillette Razor Blades 4-pack",
//     "Great Value Baby Formula 24 oz",
//     "Great Value Baby Formula 800 ct",
//     "Great Value Baby Wipes 800 ct",
//     "Great Value Conditioner 20 oz",
//     "Great Value Shampoo 20 oz",
//     "Great Value Supplements Multivitamin 120 ct",
//     "Great Value Supplements Omega-3 120 ct",
//     "Great Value Vitamins Multivitamin 120 ct",
//     "Great Value Vitamins Omega-3 120 ct",
//     "Huggies Diapers Size 3 120 ct",
//     "Huggies Diapers Size 5 100 ct",
//     "Huggies Diapers Size 5 120 ct",
//     "Old Spice Body Wash 4-pack",
//     "Old Spice Razor Blades 4-pack",
//     "Pampers Diapers Size 3 120 ct",
//     "Pampers Diapers Size 5 100 ct",
//     "Tylenol Allergy Relief 100 ct",
//     "Tylenol Pain Reliever 50 ct",
//     "Zyrtec Allergy Relief 50 ct",
//     "Zyrtec Pain Reliever 50 ct"
//   ],
//   "Grocery": [
//     "Campbell's Chicken Noodle Soup 19 oz",
//     "Campbell's Vegetable Soup 19 oz",
//     "Chicken Breast 80/20 per lb",
//     "Chicken Breast Boneless per lb",
//     "Great Value 2% Milk 1 Gallon",
//     "Great Value 2% Milk Half Gallon",
//     "Great Value Bacon 12 oz",
//     "Great Value Beans 10.5 oz",
//     "Great Value Beans 15 oz",
//     "Great Value Brownies 12 oz",
//     "Great Value Canned Fruit 15 oz",
//     "Great Value Cereal 16 oz",
//     "Great Value Cereal 2 lb",
//     "Great Value Cheddar Cheese 16 oz",
//     "Great Value Cheddar Cheese 8 oz",
//     "Great Value Chicken Nuggets 16 oz",
//     "Great Value Chicken Nuggets 48 oz",
//     "Great Value Cookies 12 oz",
//     "Great Value Flour 5 lb",
//     "Great Value Frozen Vegetables 12 oz",
//     "Great Value Greek Yogurt 32 oz",
//     "Great Value Greek Yogurt 6 oz 4-pack",
//     "Great Value Ice Cream 16 oz",
//     "Great Value Ice Cream 32 oz",
//     "Great Value Mozzarella Cheese 8 oz",
//     "Great Value Pasta 2 lb",
//     "Great Value Pasta 32 oz",
//     "Great Value Pizza 16 oz",
//     "Great Value Pizza 32 oz",
//     "Great Value Pizza 48 oz",
//     "Great Value Rice 16 oz",
//     "Great Value Rice 2 lb",
//     "Great Value Sausage 12 oz",
//     "Great Value Skim Milk 1 Gallon",
//     "Great Value Soup 10.5 oz",
//     "Great Value Yogurt 6 oz 4-pack",
//     "Ground Beef Boneless per lb",
//     "Kelloggs Corn Flakes 18 oz",
//     "Kelloggs Oats 18 oz",
//     "Lean Cuisine Lasagna 10.5 oz",
//     "Lean Cuisine Mac & Cheese 10.5 oz",
//     "Pork Chops Boneless per lb",
//     "Progresso Chicken Noodle Soup 19 oz",
//     "Progresso Vegetable Soup 19 oz",
//     "Quaker Corn Flakes 18 oz",
//     "Quaker Oats 18 oz",
//     "Salmon Fillet per lb",
//     "Stouffer's Lasagna 10.5 oz",
//     "Stouffer's Mac & Cheese 10.5 oz",
//     "Tilapia Fillet per lb"
//   ],
//   "Automotive": [
//     "Armor All Tire Shine 16 oz",
//     "Castrol Motor Oil 5W-20 5 qt",
//     "Great Value Car Wash 64 oz",
//     "Great Value Wiper Fluid 64 oz",
//     "Mobil 1 Motor Oil 5W-20 5 qt",
//     "Mobil 1 Motor Oil 5W-30 5 qt"
//   ],
//   "Home": [
//     "All Laundry Detergent 92 fl oz",
//     "Angel Soft Toilet Paper 18 rolls",
//     "Charmin Toilet Paper 18 rolls",
//     "Charmin Toilet Paper 24 rolls",
//     "Coleman Cooler 4-person",
//     "Coleman Cooler 50 qt",
//     "Coleman Tent 50 qt",
//     "Gain Laundry Detergent 100 fl oz",
//     "Gain Laundry Detergent 92 fl oz",
//     "Great Value All-Purpose Cleaner 28 oz",
//     "Great Value All-Purpose Cleaner 32 oz",
//     "Great Value Bed Sheets 4-pack",
//     "Great Value Bed Sheets Queen Size",
//     "Great Value Dish Soap 28 oz",
//     "Great Value Dish Soap 32 oz",
//     "Great Value Pans & Pans Set",
//     "Great Value Pots & Pans Set",
//     "Great Value Towels 4-pack",
//     "Great Value Towels Queen Size",
//     "Instant Pot Air Fryer",
//     "Instant Pot Pressure Cooker",
//     "Instant Pot Stand Mixer",
//     "KitchenAid Air Fryer",
//     "KitchenAid Pressure Cooker",
//     "KitchenAid Stand Mixer",
//     "Ninja Pressure Cooker",
//     "Ozark Trail Tent 4-person",
//     "Ozark Trail Tent 50 qt",
//     "Tide Laundry Detergent 100 fl oz"
//   ],
//   "Toys": [
//     "Barbie Blaster",
//     "Barbie Building Set",
//     "Great Value Basketball",
//     "Great Value Board Game 1000 pieces",
//     "Great Value Board Game Family",
//     "Great Value Puzzle 1000 pieces",
//     "Great Value Puzzle Family",
//     "Great Value Soccer Ball",
//     "Hot Wheels Car Set 5-pack",
//     "Huffy Bicycle Accessories",
//     "LEGO Blaster",
//     "LEGO Building Set",
//     "LEGO Doll",
//     "Nerf Blaster",
//     "Nerf Building Set",
//     "Nerf Doll",
//     "Schwinn Bicycle Accessories"
//   ],
//   "Electronics": [
//     "Apple Laptop Core i5",
//     "Apple MacBook Core i5",
//     "Apple MacBook Core i7",
//     "Apple MacBook M2",
//     "Dell Laptop Core i7",
//     "Dell Laptop M2",
//     "Google Pixel 8 128GB",
//     "Google Pixel 8 256GB",
//     "HP MacBook M2",
//     "LG 55\" 4K Smart TV",
//     "LG 65\" 4K Smart TV",
//     "LG 75\" 4K Smart TV",
//     "Samsung 55\" 4K Smart TV",
//     "TCL 75\" 4K Smart TV",
//     "iPhone 15 128GB"
//   ],
//   "Clothing": [
//     "Adidas Hoodie",
//     "Adidas Running Shoes",
//     "Great Value Socks 3-pack",
//     "Great Value Socks 6-pack",
//     "Great Value T-Shirt 3-pack",
//     "Great Value T-Shirt 6-pack",
//     "Hanes 501 Jeans Men",
//     "Hanes 501 Jeans s",
//     "Hanes Slim Fit Shirt s",
//     "Levis 501 Jeans s",
//     "Levis Slim Fit Shirt Men",
//     "Nike Running Shoes",
//     "Wrangler 501 Jeans Men",
//     "Wrangler Slim Fit Shirt Women",
//     "Wrangler Slim Fit Shirt s"
//   ]
// };

// interface OrderResult {
//   status: string;
//   top_combinations: Array<{
//     nodes: string[];
//     total_cost: number;
//     sku_mapping: Record<string, string[]>;
//   }>;
// }

// interface NearbyReturn {
//   return_id: string;
//   latitude: number;
//   longitude: number;
//   sku_id: string;
//   sku_name: string;
//   distance_km: number;
// }

// interface AdminPanelProps {
//   orderResults: OrderResult | null;
//   onAcceptOrder: (orderData: any) => void;
//   acceptedOrders: any[];
// }

// export const AdminPanel: React.FC<AdminPanelProps> = ({ orderResults, onAcceptOrder, acceptedOrders }) => {
//   const [selectedNodeType, setSelectedNodeType] = useState<string>('Walmart Store');
//   const [selectedNodeId, setSelectedNodeId] = useState<string>('');
//   const [selectedCategory, setSelectedCategory] = useState<string>('Beverages');
//   const [selectedProduct, setSelectedProduct] = useState<string>('');
//   const [slaType, setSlaType] = useState<string>('same-day');
//   const [selectedDate, setSelectedDate] = useState<string>('');
//   const [selectedTime, setSelectedTime] = useState<string>('');
//   const [prediction, setPrediction] = useState<number | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();
//   const [nearbyReturns, setNearbyReturns] = useState<NearbyReturn[]>([]);

//   const generateSKU = (category: string, productIndex: number): string => {
//     return `SKU_${category.slice(0, 3).toUpperCase()}_${String(productIndex + 1).padStart(3, '0')}`;
//   };

//   const predictDemand = async () => {
//     if (!selectedNodeId || !selectedProduct || !selectedDate || !selectedTime) {
//       toast({
//         title: "Missing Fields",
//         description: "Please fill all required fields for prediction",
//         variant: "destructive",
//       });
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const datetime = new Date(`${selectedDate}T${selectedTime}`);
//       const products = SAMPLE_PRODUCTS[selectedCategory as keyof typeof SAMPLE_PRODUCTS] || [];
//       const productIndex = products.indexOf(selectedProduct);
//       if (productIndex === -1) {
//         toast({
//           title: "Product Error",
//           description: "Selected product not found in the category list. Please select a valid product.",
//           variant: "destructive",
//         });
//         setIsLoading(false);
//         return;
//       }
//       const skuId = generateSKU(selectedCategory, productIndex);
//       const payload = {
//         node_id: selectedNodeId,
//         SKU_id: skuId,
//         SLA_type: slaType,
//         node_type: selectedNodeType,
//         day: datetime.getDate(),
//         hour: datetime.getHours(),
//         weekday: datetime.getDay(),
//         month: datetime.getMonth() + 1
//       };
//       const response = await fetch('http://localhost:5000/predict_demand', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });
//       const result = await response.json();
//       if (result.status === 'success') {
//         setPrediction(result.prediction);
//         toast({
//           title: "Prediction Complete",
//           description: `Predicted demand: ${result.prediction} units`,
//         });
//       } else {
//         toast({
//           title: "Prediction Failed",
//           description: result.message || 'Failed to get prediction',
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       toast({
//         title: "Prediction Failed",
//         description: "Failed to connect to prediction service",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const acceptOrder = (orderOption: any) => {
//     onAcceptOrder({ ...orderOption, acceptedAt: new Date() });
//     toast({
//       title: "Order Accepted",
//       description: "Order has been accepted and forwarded to fulfillment",
//     });
//   };

//   const fetchNearbyReturns = async (latitude: number, longitude: number) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('http://localhost:5000/get_nearby_returns', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ latitude, longitude, radius_km: 3 }),
//       });
//       const result = await response.json();
//       if (result.status === 'success') {
//         setNearbyReturns(result.nearby_returns);
//       } else {
//         toast({
//           title: "Error",
//           description: result.message || 'Failed to fetch nearby returns',
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to connect to the server for nearby returns",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (orderResults && orderResults.top_combinations?.length > 0) {
//       // Use a sample customer location (replace with actual order location if available)
//       const latitude = 33.7838; // Midtown Atlanta
//       const longitude = -84.3830;
//       fetchNearbyReturns(latitude, longitude);
//     }
//   }, [orderResults]);

//   const availableNodeIds = NODE_TYPE_MAP[selectedNodeType as keyof typeof NODE_TYPE_MAP] || [];
//   const availableProducts = SAMPLE_PRODUCTS[selectedCategory as keyof typeof SAMPLE_PRODUCTS] || [];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
//       {/* Header */}
//       <header className="glass-card border-0 border-b border-glass-border rounded-none backdrop-blur-xl">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center space-x-4">
//             <div className="bg-gradient-walmart p-3 rounded-xl animate-pulse-glow">
//               <Users className="w-6 h-6 text-foreground" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
//                 Walmart Admin Portal
//               </h1>
//               <p className="text-muted-foreground text-sm">Order Management & Analytics</p>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-6 py-8">
//         {/* Dashboard Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <Card className="glass-card hover-lift">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Total Orders</p>
//                   <p className="text-2xl font-bold text-primary">{acceptedOrders.length}</p>
//                 </div>
//                 <ShoppingBag className="w-8 h-8 text-primary" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="glass-card hover-lift">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Pending Orders</p>
//                   <p className="text-2xl font-bold text-walmart-yellow">
//                     {orderResults?.top_combinations?.length || 0}
//                   </p>
//                 </div>
//                 <Clock className="w-8 h-8 text-walmart-yellow" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="glass-card hover-lift">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Revenue</p>
//                   <p className="text-2xl font-bold text-success">
//                     ${acceptedOrders.reduce((sum, order) => sum + order.total_cost, 0).toFixed(2)}
//                   </p>
//                 </div>
//                 <DollarSign className="w-8 h-8 text-success" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="glass-card hover-lift">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Efficiency</p>
//                   <p className="text-2xl font-bold text-primary">94.2%</p>
//                 </div>
//                 <Activity className="w-8 h-8 text-primary" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <Tabs defaultValue="orders" className="space-y-6">
//           <TabsList className="grid w-full grid-cols-2 glass-card">
//             <TabsTrigger value="orders" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
//               Order Management
//             </TabsTrigger>
//             <TabsTrigger value="prediction" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
//               Demand Prediction
//             </TabsTrigger>
//           </TabsList>

//           {/* Order Management Tab */}
//           <TabsContent value="orders" className="space-y-6">
//             {orderResults && orderResults.top_combinations?.length > 0 ? (
//               <div className="space-y-6">
//                 <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
//                   Pending Order Processing
//                 </h2>
//                 {orderResults.top_combinations.map((option, index) => (
//                   <Card key={index} className="glass-card animate-slide-up hover-lift">
//                     <CardHeader>
//                       <CardTitle className="flex items-center justify-between">
//                         <span className="flex items-center gap-2">
//                           <Package className="w-5 h-5 text-primary" />
//                           Option {index + 1}
//                         </span>
//                         <Badge variant="secondary" className="text-lg font-bold">
//                           ${option.total_cost.toFixed(2)}
//                         </Badge>
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <h4 className="font-semibold text-primary mb-2">Fulfillment Nodes</h4>
//                           <div className="space-y-2">
//                             {option.nodes.map((node) => (
//                               <div key={node} className="flex items-center gap-2 p-2 bg-muted/20 rounded-lg">
//                                 <MapPin className="w-4 h-4 text-primary" />
//                                 <span className="text-sm font-medium">{node}</span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-primary mb-2">SKU Distribution</h4>
//                           <div className="space-y-2">
//                             {Object.entries(option.sku_mapping).map(([nodeId, skus]) => (
//                               <div key={nodeId} className="p-2 bg-muted/20 rounded-lg">
//                                 <p className="text-sm font-medium text-primary">{nodeId}</p>
//                                 <p className="text-xs text-muted-foreground">
//                                   {Array.isArray(skus) ? skus.join(', ') : skus}
//                                 </p>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex justify-end">
//                         <Button
//                           variant="walmart-primary"
//                           onClick={() => acceptOrder(option)}
//                           className="flex items-center gap-2"
//                         >
//                           <CheckCircle className="w-4 h-4" />
//                           Accept Order
//                         </Button>
//                       </div>
//                       <div className="mt-4">
//                         <h4 className="font-semibold text-primary mb-2">Nearby Returns within 3km</h4>
//                         {nearbyReturns.length > 0 ? (
//                           <div className="space-y-2">
//                             {nearbyReturns.map((returnItem, idx) => (
//                               <div key={idx} className="p-2 bg-muted/20 rounded-lg">
//                                 <p className="text-sm font-medium">Return ID: {returnItem.return_id}</p>
//                                 <p className="text-xs text-muted-foreground">
//                                   SKU: {returnItem.sku_name} (ID: {returnItem.sku_id}) - {returnItem.distance_km} km
//                                 </p>
//                               </div>
//                             ))}
//                           </div>
//                         ) : (
//                           <p className="text-muted-foreground">No nearby returns found within 3km.</p>
//                         )}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             ) : (
//               <Card className="glass-card">
//                 <CardContent className="p-8 text-center">
//                   <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
//                   <h3 className="text-lg font-semibold text-muted-foreground mb-2">No Pending Orders</h3>
//                   <p className="text-muted-foreground">Orders from customers will appear here for processing</p>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Accepted Orders */}
//             {acceptedOrders.length > 0 && (
//               <div className="space-y-4">
//                 <h3 className="text-xl font-bold text-success">Accepted Orders</h3>
//                 {acceptedOrders.map((order, index) => (
//                   <Card key={index} className="glass-card border-success/20">
//                     <CardContent className="p-4">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                           <CheckCircle className="w-5 h-5 text-success" />
//                           <div>
//                             <p className="font-medium">Order {index + 1}</p>
//                             <p className="text-sm text-muted-foreground">
//                               Accepted at: {order.acceptedAt.toLocaleTimeString()}
//                             </p>
//                           </div>
//                         </div>
//                         <Badge variant="secondary">${order.total_cost.toFixed(2)}</Badge>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </TabsContent>

//           {/* Demand Prediction Tab */}
//           <TabsContent value="prediction" className="space-y-6">
//             <Card className="glass-card">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <TrendingUp className="w-6 h-6 text-primary" />
//                   Demand Prediction Tool
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="nodeType">Node Type</Label>
//                       <Select value={selectedNodeType} onValueChange={setSelectedNodeType}>
//                         <SelectTrigger className="bg-glass-bg border-glass-border">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {Object.keys(NODE_TYPE_MAP).map((type) => (
//                             <SelectItem key={type} value={type}>{type}</SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div>
//                       <Label htmlFor="nodeId">Node ID</Label>
//                       <Select value={selectedNodeId} onValueChange={setSelectedNodeId}>
//                         <SelectTrigger className="bg-glass-bg border-glass-border">
//                           <SelectValue placeholder="Select Node ID" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {availableNodeIds.slice(0, 20).map((nodeId) => (
//                             <SelectItem key={nodeId} value={nodeId}>{nodeId}</SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div>
//                       <Label htmlFor="category">Product Category</Label>
//                       <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//                         <SelectTrigger className="bg-glass-bg border-glass-border">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {CATEGORY_OPTIONS.map((category) => (
//                             <SelectItem key={category} value={category}>{category}</SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div>
//                       <Label htmlFor="product">Product</Label>
//                       <Select value={selectedProduct} onValueChange={setSelectedProduct}>
//                         <SelectTrigger className="bg-glass-bg border-glass-border">
//                           <SelectValue placeholder="Select Product" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {availableProducts.map((product) => (
//                             <SelectItem key={product} value={product}>{product}</SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="sla">SLA Type</Label>
//                       <Select value={slaType} onValueChange={setSlaType}>
//                         <SelectTrigger className="bg-glass-bg border-glass-border">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="same-day">Same Day</SelectItem>
//                           <SelectItem value="next-day">Next Day</SelectItem>
//                           <SelectItem value="two-day">Two Day</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div>
//                       <Label htmlFor="date">Date</Label>
//                       <Input
//                         type="date"
//                         value={selectedDate}
//                         onChange={(e) => setSelectedDate(e.target.value)}
//                         className="bg-glass-bg border-glass-border"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="time">Time</Label>
//                       <Input
//                         type="time"
//                         value={selectedTime}
//                         onChange={(e) => setSelectedTime(e.target.value)}
//                         className="bg-glass-bg border-glass-border"
//                       />
//                     </div>

//                     <Button
//                       variant="walmart-primary"
//                       size="lg"
//                       onClick={predictDemand}
//                       disabled={isLoading}
//                       className="w-full"
//                     >
//                       {isLoading ? 'Predicting...' : 'Predict Demand'}
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Prediction Results with Enhanced Analytics */}
//                 {prediction !== null && (
//                   <div className="space-y-6 animate-slide-up">
//                     <Card className="glass-card border-success/20">
//                       <CardContent className="p-6">
//                         <div className="text-center">
//                           <TrendingUp className="w-12 h-12 text-success mx-auto mb-4" />
//                           <h3 className="text-2xl font-bold text-success mb-2">
//                             Predicted Demand: {prediction} units
//                           </h3>
//                           <p className="text-muted-foreground">
//                             Based on historical data and current parameters
//                           </p>
//                         </div>
//                       </CardContent>
//                     </Card>

//                     {/* Enhanced Analytics Grid */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                       <AnalyticsCard 
//                         data={{
//                           title: "Historical Average",
//                           value: Math.max(1, prediction - 2),
//                           unit: "units",
//                           trend: "neutral",
//                           chartData: [prediction - 3, prediction - 2, prediction - 1, prediction - 2, prediction]
//                         }}
//                       />
//                       <AnalyticsCard 
//                         data={{
//                           title: "Current Prediction",
//                           value: prediction,
//                           unit: "units",
//                           trend: "up",
//                           trendValue: 12,
//                           chartData: [prediction - 5, prediction - 3, prediction - 1, prediction + 1, prediction]
//                         }}
//                       />
//                       <AnalyticsCard 
//                         data={{
//                           title: "Confidence Score",
//                           value: 92,
//                           unit: "%",
//                           trend: "up",
//                           trendValue: 5,
//                           chartData: [88, 90, 91, 92, 92]
//                         }}
//                       />
//                     </div>

//                     {/* Additional Analytics */}
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                       <AnalyticsCard 
//                         data={{
//                           title: "Peak Demand Window",
//                           value: new Date(`${selectedDate}T${selectedTime}`).getHours(),
//                           unit: ":00 - " + (new Date(`${selectedDate}T${selectedTime}`).getHours() + 2) + ":00",
//                           trend: "up",
//                           trendValue: 15
//                         }}
//                       />
//                       <AnalyticsCard 
//                         data={{
//                           title: "Inventory Recommendation",
//                           value: Math.ceil(prediction * 1.2),
//                           unit: "units",
//                           trend: "up",
//                           trendValue: 20,
//                           chartData: [prediction, prediction * 1.1, prediction * 1.15, prediction * 1.2, prediction * 1.2]
//                         }}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };



import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  LineChart, 
  MapPin, 
  Package, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Users,
  ShoppingBag,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AnalyticsCard } from '@/components/AnalyticsCard';

// Data from the original application
const NODE_TYPE_MAP = {
  "Walmart Store": Array.from({length: 8149}, (_, i) => `WM_${i + 1001}`),
  "Fulfillment Center": Array.from({length: 15}, (_, i) => `FC_MW${String(i + 1).padStart(2, '0')}`),
  "Dark Store": [
    ...Array.from({length: 10}, (_, i) => `DS_ATL${String(i + 1).padStart(2, '0')}`),
    ...Array.from({length: 10}, (_, i) => `DS_SJ${String(i + 1).padStart(2, '0')}`)
  ]
};

const CATEGORY_OPTIONS = [
  "Beverages", "Pet Supplies", "Grocery", "Electronics", "Home", 
  "Toys", "Clothing", "Automotive", "Pharma", "Bakery", "Produce"
];

const SAMPLE_PRODUCTS = {
  "Beverages": [
    "Aquafina 12 Pack Iced Tea",
    "Coca-Cola 12 Pack Cans",
    "Dr Pepper 12 Pack Cans",
    "Great Value Apple Juice 1 Gallon",
    "Great Value Orange Juice 1 Gallon",
    "Lipton 12 Pack Iced Tea",
    "Lipton 24 Pack Water",
    "Pepsi 12 Pack Cans"
  ],
  "Pet Supplies": [
    "Great Value Cat Litter 10 oz",
    "Great Value Cat Litter 25 lb",
    "Great Value Pet Treats 25 lb",
    "Kong Dog Toy",
    "Nylabone Dog Toy",
    "Pedigree Cat Food 15 lb",
    "Pedigree Dog Food 15 lb",
    "Pedigree Dog Food 20 lb",
    "Purina Cat Food 15 lb",
    "Purina Cat Food 20 lb",
    "Purina Dog Food 15 lb",
    "Purina Dog Food 20 lb"
  ],
  "Bakery": [
    "Great Value Bagels 12-pack",
    "Great Value Bread Sourdough 20 oz",
    "Great Value Bread White 20 oz",
    "Great Value Donuts 12-pack",
    "Great Value Donuts 6-pack",
    "Great Value Muffins 12-pack",
    "Great Value Muffins 6-pack",
    "Wonder Bread Sourdough 20 oz",
    "Wonder Bread Wheat 20 oz",
    "Wonder Bread White 20 oz"
  ],
  "Produce": [
    "Apples 1 lb container",
    "Apples per lb",
    "Bananas 1 lb container",
    "Bananas per lb",
    "Blueberries 1 lb container",
    "Carrots per lb",
    "Kale 1 head",
    "Kale 5 oz bag",
    "Lettuce 1 head",
    "Lettuce 5 oz bag",
    "Oranges 1 lb container",
    "Oranges per lb",
    "Potatoes 5 lb bag",
    "Potatoes by lb",
    "Spinach 1 head",
    "Spinach 5 oz bag",
    "Strawberries 1 lb container",
    "Strawberries per lb",
    "Sweet Potatoes 5 lb bag"
  ],
  "Pharma": [
    "Advil Allergy Relief 100 ct",
    "Advil Pain Reliever 50 ct",
    "Band-Aid Adhesive Bandages 60 ct",
    "Colgate Toothpaste 6 oz",
    "Crest Toothpaste 6 oz",
    "Dove Deodorant 4-pack",
    "Dove Razor Blades 13.5 oz",
    "Gerber Baby Food 8 oz",
    "Gerber Cereal 8 oz",
    "Gillette Deodorant 13.5 oz",
    "Gillette Razor Blades 4-pack",
    "Great Value Baby Formula 24 oz",
    "Great Value Baby Formula 800 ct",
    "Great Value Baby Wipes 800 ct",
    "Great Value Conditioner 20 oz",
    "Great Value Shampoo 20 oz",
    "Great Value Supplements Multivitamin 120 ct",
    "Great Value Supplements Omega-3 120 ct",
    "Great Value Vitamins Multivitamin 120 ct",
    "Great Value Vitamins Omega-3 120 ct",
    "Huggies Diapers Size 3 120 ct",
    "Huggies Diapers Size 5 100 ct",
    "Huggies Diapers Size 5 120 ct",
    "Old Spice Body Wash 4-pack",
    "Old Spice Razor Blades 4-pack",
    "Pampers Diapers Size 3 120 ct",
    "Pampers Diapers Size 5 100 ct",
    "Tylenol Allergy Relief 100 ct",
    "Tylenol Pain Reliever 50 ct",
    "Zyrtec Allergy Relief 50 ct",
    "Zyrtec Pain Reliever 50 ct"
  ],
  "Grocery": [
    "Campbell's Chicken Noodle Soup 19 oz",
    "Campbell's Vegetable Soup 19 oz",
    "Chicken Breast 80/20 per lb",
    "Chicken Breast Boneless per lb",
    "Great Value 2% Milk 1 Gallon",
    "Great Value 2% Milk Half Gallon",
    "Great Value Bacon 12 oz",
    "Great Value Beans 10.5 oz",
    "Great Value Beans 15 oz",
    "Great Value Brownies 12 oz",
    "Great Value Canned Fruit 15 oz",
    "Great Value Cereal 16 oz",
    "Great Value Cereal 2 lb",
    "Great Value Cheddar Cheese 16 oz",
    "Great Value Cheddar Cheese 8 oz",
    "Great Value Chicken Nuggets 16 oz",
    "Great Value Chicken Nuggets 48 oz",
    "Great Value Cookies 12 oz",
    "Great Value Flour 5 lb",
    "Great Value Frozen Vegetables 12 oz",
    "Great Value Greek Yogurt 32 oz",
    "Great Value Greek Yogurt 6 oz 4-pack",
    "Great Value Ice Cream 16 oz",
    "Great Value Ice Cream 32 oz",
    "Great Value Mozzarella Cheese 8 oz",
    "Great Value Pasta 2 lb",
    "Great Value Pasta 32 oz",
    "Great Value Pizza 16 oz",
    "Great Value Pizza 32 oz",
    "Great Value Pizza 48 oz",
    "Great Value Rice 16 oz",
    "Great Value Rice 2 lb",
    "Great Value Sausage 12 oz",
    "Great Value Skim Milk 1 Gallon",
    "Great Value Soup 10.5 oz",
    "Great Value Yogurt 6 oz 4-pack",
    "Ground Beef Boneless per lb",
    "Kelloggs Corn Flakes 18 oz",
    "Kelloggs Oats 18 oz",
    "Lean Cuisine Lasagna 10.5 oz",
    "Lean Cuisine Mac & Cheese 10.5 oz",
    "Pork Chops Boneless per lb",
    "Progresso Chicken Noodle Soup 19 oz",
    "Progresso Vegetable Soup 19 oz",
    "Quaker Corn Flakes 18 oz",
    "Quaker Oats 18 oz",
    "Salmon Fillet per lb",
    "Stouffer's Lasagna 10.5 oz",
    "Stouffer's Mac & Cheese 10.5 oz",
    "Tilapia Fillet per lb"
  ],
  "Automotive": [
    "Armor All Tire Shine 16 oz",
    "Castrol Motor Oil 5W-20 5 qt",
    "Great Value Car Wash 64 oz",
    "Great Value Wiper Fluid 64 oz",
    "Mobil 1 Motor Oil 5W-20 5 qt",
    "Mobil 1 Motor Oil 5W-30 5 qt"
  ],
  "Home": [
    "All Laundry Detergent 92 fl oz",
    "Angel Soft Toilet Paper 18 rolls",
    "Charmin Toilet Paper 18 rolls",
    "Charmin Toilet Paper 24 rolls",
    "Coleman Cooler 4-person",
    "Coleman Cooler 50 qt",
    "Coleman Tent 50 qt",
    "Gain Laundry Detergent 100 fl oz",
    "Gain Laundry Detergent 92 fl oz",
    "Great Value All-Purpose Cleaner 28 oz",
    "Great Value All-Purpose Cleaner 32 oz",
    "Great Value Bed Sheets 4-pack",
    "Great Value Bed Sheets Queen Size",
    "Great Value Dish Soap 28 oz",
    "Great Value Dish Soap 32 oz",
    "Great Value Pans & Pans Set",
    "Great Value Pots & Pans Set",
    "Great Value Towels 4-pack",
    "Great Value Towels Queen Size",
    "Instant Pot Air Fryer",
    "Instant Pot Pressure Cooker",
    "Instant Pot Stand Mixer",
    "KitchenAid Air Fryer",
    "KitchenAid Pressure Cooker",
    "KitchenAid Stand Mixer",
    "Ninja Pressure Cooker",
    "Ozark Trail Tent 4-person",
    "Ozark Trail Tent 50 qt",
    "Tide Laundry Detergent 100 fl oz"
  ],
  "Toys": [
    "Barbie Blaster",
    "Barbie Building Set",
    "Great Value Basketball",
    "Great Value Board Game 1000 pieces",
    "Great Value Board Game Family",
    "Great Value Puzzle 1000 pieces",
    "Great Value Puzzle Family",
    "Great Value Soccer Ball",
    "Hot Wheels Car Set 5-pack",
    "Huffy Bicycle Accessories",
    "LEGO Blaster",
    "LEGO Building Set",
    "LEGO Doll",
    "Nerf Blaster",
    "Nerf Building Set",
    "Nerf Doll",
    "Schwinn Bicycle Accessories"
  ],
  "Electronics": [
    "Apple Laptop Core i5",
    "Apple MacBook Core i5",
    "Apple MacBook Core i7",
    "Apple MacBook M2",
    "Dell Laptop Core i7",
    "Dell Laptop M2",
    "Google Pixel 8 128GB",
    "Google Pixel 8 256GB",
    "HP MacBook M2",
    "LG 55\" 4K Smart TV",
    "LG 65\" 4K Smart TV",
    "LG 75\" 4K Smart TV",
    "Samsung 55\" 4K Smart TV",
    "TCL 75\" 4K Smart TV",
    "iPhone 15 128GB"
  ],
  "Clothing": [
    "Adidas Hoodie",
    "Adidas Running Shoes",
    "Great Value Socks 3-pack",
    "Great Value Socks 6-pack",
    "Great Value T-Shirt 3-pack",
    "Great Value T-Shirt 6-pack",
    "Hanes 501 Jeans Men",
    "Hanes 501 Jeans s",
    "Hanes Slim Fit Shirt s",
    "Levis 501 Jeans s",
    "Levis Slim Fit Shirt Men",
    "Nike Running Shoes",
    "Wrangler 501 Jeans Men",
    "Wrangler Slim Fit Shirt Women",
    "Wrangler Slim Fit Shirt s"
  ]
};

interface OrderResult {
  status: string;
  top_combinations: Array<{
    nodes: string[];
    total_cost: number;
    sku_mapping: Record<string, string[]>;
  }>;
}

interface NearbyReturn {
  return_id: string;
  latitude: number;
  longitude: number;
  sku_id: string;
  sku_name: string;
  distance_km: number;
}

interface AdminPanelProps {
  orderResults: OrderResult | null;
  onAcceptOrder: (orderData: any) => void;
  acceptedOrders: any[];
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ orderResults, onAcceptOrder, acceptedOrders }) => {
  const [selectedNodeType, setSelectedNodeType] = useState<string>('Walmart Store');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Beverages');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [slaType, setSlaType] = useState<string>('same-day');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [nearbyReturns, setNearbyReturns] = useState<NearbyReturn[]>([]);

  const generateSKU = (category: string, productIndex: number): string => {
    return `SKU_${category.slice(0, 3).toUpperCase()}_${String(productIndex + 1).padStart(3, '0')}`;
  };

  const predictDemand = async () => {
    if (!selectedNodeId || !selectedProduct || !selectedDate || !selectedTime) {
      toast({
        title: "Missing Fields",
        description: "Please fill all required fields for prediction",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      const datetime = new Date(`${selectedDate}T${selectedTime}`);
      const products = SAMPLE_PRODUCTS[selectedCategory as keyof typeof SAMPLE_PRODUCTS] || [];
      const productIndex = products.indexOf(selectedProduct);
      if (productIndex === -1) {
        toast({
          title: "Product Error",
          description: "Selected product not found in the category list. Please select a valid product.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      const skuId = generateSKU(selectedCategory, productIndex);
      const payload = {
        node_id: selectedNodeId,
        SKU_id: skuId,
        SLA_type: slaType,
        node_type: selectedNodeType,
        day: datetime.getDate(),
        hour: datetime.getHours(),
        weekday: datetime.getDay(),
        month: datetime.getMonth() + 1
      };
      const response = await fetch('http://localhost:5000/predict_demand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status === 'success') {
        setPrediction(result.prediction);
        toast({
          title: "Prediction Complete",
          description: `Predicted demand: ${result.prediction} units`,
        });
      } else {
        toast({
          title: "Prediction Failed",
          description: result.message || 'Failed to get prediction',
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Prediction Failed",
        description: "Failed to connect to prediction service",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const acceptOrder = (orderOption: any) => {
    onAcceptOrder({ ...orderOption, acceptedAt: new Date() });
    toast({
      title: "Order Accepted",
      description: "Order has been accepted and forwarded to fulfillment",
    });
  };

  const fetchNearbyReturns = async (latitude: number, longitude: number) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/get_nearby_returns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude, radius_km: 3 }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        setNearbyReturns(result.nearby_returns);
      } else {
        toast({
          title: "Error",
          description: result.message || 'Failed to fetch nearby returns',
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to the server for nearby returns",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (orderResults && orderResults.top_combinations?.length > 0) {
      // Use a sample customer location (replace with actual order location if available)
      const latitude = 33.7838; // Midtown Atlanta
      const longitude = -84.3830;
      fetchNearbyReturns(latitude, longitude);
    }
  }, [orderResults]);

  const availableNodeIds = NODE_TYPE_MAP[selectedNodeType as keyof typeof NODE_TYPE_MAP] || [];
  const availableProducts = SAMPLE_PRODUCTS[selectedCategory as keyof typeof SAMPLE_PRODUCTS] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="glass-card border-0 border-b border-glass-border rounded-none backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-walmart p-3 rounded-xl animate-pulse-glow">
              <Users className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Walmart Admin Portal
              </h1>
              <p className="text-muted-foreground text-sm">Order Management & Analytics</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold text-primary">{acceptedOrders.length}</p>
                </div>
                <ShoppingBag className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Orders</p>
                  <p className="text-2xl font-bold text-walmart-yellow">
                    {orderResults?.top_combinations?.length || 0}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-walmart-yellow" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold text-success">
                    ${acceptedOrders.reduce((sum, order) => sum + order.total_cost, 0).toFixed(2)}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Efficiency</p>
                  <p className="text-2xl font-bold text-primary">94.2%</p>
                </div>
                <Activity className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 glass-card">
            <TabsTrigger value="orders" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Order Management
            </TabsTrigger>
            <TabsTrigger value="prediction" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Demand Prediction
            </TabsTrigger>
          </TabsList>

          {/* Order Management Tab */}
          <TabsContent value="orders" className="space-y-6">
            {orderResults && orderResults.top_combinations?.length > 0 ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Pending Order Processing
                </h2>
                {orderResults.top_combinations.map((option, index) => (
                  <Card key={index} className="glass-card animate-slide-up hover-lift">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Package className="w-5 h-5 text-primary" />
                          Option {index + 1}
                        </span>
                        <Badge variant="secondary" className="text-lg font-bold">
                          ${option.total_cost.toFixed(2)}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-primary mb-2">Fulfillment Nodes</h4>
                          <div className="space-y-2">
                            {option.nodes.map((node) => (
                              <div key={node} className="flex items-center gap-2 p-2 bg-muted/20 rounded-lg">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span className="text-sm1 font-medium">{node}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary mb-2">SKU Distribution</h4>
                          <div className="space-y-2">
                            {Object.entries(option.sku_mapping).map(([nodeId, skus]) => (
                              <div key={nodeId} className="p-2 bg-muted/20 rounded-lg">
                                <p className="text-sm font-medium text-primary">{nodeId}</p>
                                <p className="text-xs text-muted-foreground">
                                  {Array.isArray(skus) ? skus.join(', ') : skus}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button
                          variant="walmart-primary"
                          onClick={() => acceptOrder(option)}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Accept Order
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <div className="mt-4">
                  <h4 className="font-semibold text-primary mb-2">Nearby Returns within 3km</h4>
                  {nearbyReturns.length > 0 ? (
                    <div className="space-y-2">
                      {nearbyReturns.map((returnItem, idx) => (
                        <div key={idx} className="p-2 bg-muted/20 rounded-lg">
                          <p className="text-sm font-medium">Return ID: {returnItem.return_id}</p>
                          <p className="text-xs text-muted-foreground">
                            SKU: {returnItem.sku_name} (ID: {returnItem.sku_id}) - {returnItem.distance_km} km
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No nearby returns found within 3km.</p>
                  )}
                </div>
              </div>
            ) : (
              <Card className="glass-card">
                <CardContent className="p-8 text-center">
                  <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">No Pending Orders</h3>
                  <p className="text-muted-foreground">Orders from customers will appear here for processing</p>
                </CardContent>
              </Card>
            )}

            {/* Accepted Orders */}
            {acceptedOrders.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-success">Accepted Orders</h3>
                {acceptedOrders.map((order, index) => (
                  <Card key={index} className="glass-card border-success/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-success" />
                          <div>
                            <p className="font-medium">Order {index + 1}</p>
                            <p className="text-sm text-muted-foreground">
                              Accepted at: {order.acceptedAt.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary">${order.total_cost.toFixed(2)}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Demand Prediction Tab */}
          <TabsContent value="prediction" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  Demand Prediction Tool
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nodeType">Node Type</Label>
                      <Select value={selectedNodeType} onValueChange={setSelectedNodeType}>
                        <SelectTrigger className="bg-glass-bg border-glass-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(NODE_TYPE_MAP).map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="nodeId">Node ID</Label>
                      <Select value={selectedNodeId} onValueChange={setSelectedNodeId}>
                        <SelectTrigger className="bg-glass-bg border-glass-border">
                          <SelectValue placeholder="Select Node ID" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableNodeIds.slice(0, 20).map((nodeId) => (
                            <SelectItem key={nodeId} value={nodeId}>{nodeId}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="category">Product Category</Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="bg-glass-bg border-glass-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORY_OPTIONS.map((category) => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="product">Product</Label>
                      <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                        <SelectTrigger className="bg-glass-bg border-glass-border">
                          <SelectValue placeholder="Select Product" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableProducts.map((product) => (
                            <SelectItem key={product} value={product}>{product}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="sla">SLA Type</Label>
                      <Select value={slaType} onValueChange={setSlaType}>
                        <SelectTrigger className="bg-glass-bg border-glass-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="same-day">Same Day</SelectItem>
                          <SelectItem value="next-day">Next Day</SelectItem>
                          <SelectItem value="two-day">Two Day</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="bg-glass-bg border-glass-border"
                      />
                    </div>

                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="bg-glass-bg border-glass-border"
                      />
                    </div>

                    <Button
                      variant="walmart-primary"
                      size="lg"
                      onClick={predictDemand}
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? 'Predicting...' : 'Predict Demand'}
                    </Button>
                  </div>
                </div>

                {/* Prediction Results with Enhanced Analytics */}
                {prediction !== null && (
                  <div className="space-y-6 animate-slide-up">
                    <Card className="glass-card border-success/20">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <TrendingUp className="w-12 h-12 text-success mx-auto mb-4" />
                          <h3 className="text-2xl font-bold text-success mb-2">
                            Predicted Demand: {prediction} units
                          </h3>
                          <p className="text-muted-foreground">
                            Based on historical data and current parameters
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Enhanced Analytics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <AnalyticsCard 
                        data={{
                          title: "Historical Average",
                          value: Math.max(1, prediction - 2),
                          unit: "units",
                          trend: "neutral",
                          chartData: [prediction - 3, prediction - 2, prediction - 1, prediction - 2, prediction]
                        }}
                      />
                      <AnalyticsCard 
                        data={{
                          title: "Current Prediction",
                          value: prediction,
                          unit: "units",
                          trend: "up",
                          trendValue: 12,
                          chartData: [prediction - 5, prediction - 3, prediction - 1, prediction + 1, prediction]
                        }}
                      />
                      <AnalyticsCard 
                        data={{
                          title: "Confidence Score",
                          value: 92,
                          unit: "%",
                          trend: "up",
                          trendValue: 5,
                          chartData: [88, 90, 91, 92, 92]
                        }}
                      />
                    </div>

                    {/* Additional Analytics */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <AnalyticsCard 
                        data={{
                          title: "Peak Demand Window",
                          value: new Date(`${selectedDate}T${selectedTime}`).getHours(),
                          unit: ":00 - " + (new Date(`${selectedDate}T${selectedTime}`).getHours() + 2) + ":00",
                          trend: "up",
                          trendValue: 15
                        }}
                      />
                      <AnalyticsCard 
                        data={{
                          title: "Inventory Recommendation",
                          value: Math.ceil(prediction * 1.2),
                          unit: "units",
                          trend: "up",
                          trendValue: 20,
                          chartData: [prediction, prediction * 1.1, prediction * 1.15, prediction * 1.2, prediction * 1.2]
                        }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
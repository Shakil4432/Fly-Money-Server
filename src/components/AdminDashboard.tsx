"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Progress } from "@/components/ui/progress";
import {
  BarChart as RBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart as RLineChart,
  Line,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

// === Brand Colors (your preference) ===
const PRIMARY = "#7c3f00";
const SECONDARY = "#e7995e"; // sand
const NEUTRAL = "#e5e7eb"; // gray-200 for chart grid

// === Helpers ===
const currency = (v: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(v || 0);

const monthLabel = (m: number) =>
  [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][(m - 1 + 12) % 12];

// === Types (lightweight) ===
interface PaymentStatusCount {
  totalPayments: number;
  status: string;
}

interface DashboardData {
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
  totalPayments: number;
  paymentStatusCounts: PaymentStatusCount[];
  pieChartData: { totalAmount: number }[]; // not directly used
  barChartData: { totalOrders: number; year: number; month: number }[];
  lineChartData: { totalSales: number; date: string }[]; // ISO date
  todaysSalesAmount: number;
}

// Optional: pass explicit expenses; if not provided, we show an empty state “guide”
interface Props {
  data: DashboardData;
  expenseLineData?: { totalExpense: number; date: string }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border bg-white px-3 py-2 shadow-sm">
      <div className="text-xs text-gray-500">{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} className="text-sm font-medium">
          {p.name}: {typeof p.value === "number" ? currency(p.value) : p.value}
        </div>
      ))}
    </div>
  );
};

export default function AdminDashboard({ data, expenseLineData }: Props) {
  // === Derived Values ===
  const paid =
    (data?.paymentStatusCounts ?? []).find((p) => p.status === "Paid")
      ?.totalPayments || 0;

  const pending =
    (data?.paymentStatusCounts ?? []).find((p) => p.status === "Pending")
      ?.totalPayments || 0;

  const paidPct = data?.totalPayments
    ? Math.round((paid / data.totalPayments) * 100)
    : 0;

  const ordersBar = useMemo(
    () =>
      (data?.barChartData ?? []).map((d) => ({
        ...d,
        label: `${monthLabel(d.month)} ${d.year}`,
      })),
    [data?.barChartData]
  );

  const salesLine = useMemo(
    () =>
      (data?.lineChartData ?? []).map((d) => ({
        date: new Date(d.date).toLocaleDateString(undefined, {
          month: "short",
          day: "2-digit",
        }),
        totalSales: d.totalSales,
      })),
    [data?.lineChartData]
  );

  const hasExpense = !!expenseLineData?.length;
  const expenseSeries = useMemo(
    () =>
      (expenseLineData || []).map((d) => ({
        date: new Date(d.date).toLocaleDateString(undefined, {
          month: "short",
          day: "2-digit",
        }),
        totalExpense: d.totalExpense,
      })),
    [expenseLineData]
  );

  // Merge for dual-area chart if both exist by date label
  const revVsExp = useMemo(() => {
    if (!hasExpense) return [] as any[];
    const map = new Map<
      string,
      { date: string; revenue?: number; expense?: number }
    >();
    salesLine.forEach((r) =>
      map.set(r.date, { date: r.date, revenue: r.totalSales })
    );
    expenseSeries.forEach((e) => {
      const existing = map.get(e.date) || { date: e.date };
      existing.expense = e.totalExpense;
      map.set(e.date, existing);
    });
    return Array.from(map.values()).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [hasExpense, salesLine, expenseSeries]);

  if (!data) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Admin Analytics
          </h1>
          <p className="text-sm text-muted-foreground">
            A clean, responsive dashboard built around your real data.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-5 w-5" style={{ color: PRIMARY }} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{data.totalUsers}</div>
              <div className="border border-b border-dotted my-3"></div>
              <p className="text-xs text-muted-foreground">
                All registered accounts
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <ShoppingCart className="h-5 w-5" style={{ color: PRIMARY }} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{data.totalOrders}</div>
              <div className="border border-b border-dotted my-3"></div>
              <p className="text-xs text-muted-foreground">Across all time</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <Package className="h-5 w-5" style={{ color: PRIMARY }} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{data.totalProducts}</div>
              <div className="border border-b border-dotted my-3"></div>
              <p className="text-xs text-muted-foreground">Active SKU count</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-5 w-5" style={{ color: PRIMARY }} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {currency(data.totalRevenue)}
              </div>
              <div className="border border-b border-dotted my-3"></div>
              <p className="text-xs text-muted-foreground">
                Lifetime gross sales
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Payment Status Donut */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Payment Status</CardTitle>
              <CardDescription>
                Total payments: {data.totalPayments}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      <linearGradient id="gradPaid" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor={PRIMARY}
                          stopOpacity={0.9}
                        />
                        <stop
                          offset="100%"
                          stopColor={PRIMARY}
                          stopOpacity={0.6}
                        />
                      </linearGradient>
                      <linearGradient
                        id="gradPending"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={SECONDARY}
                          stopOpacity={0.9}
                        />
                        <stop
                          offset="100%"
                          stopColor={SECONDARY}
                          stopOpacity={0.6}
                        />
                      </linearGradient>
                    </defs>
                    <Pie
                      data={data.paymentStatusCounts ?? []}
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="totalPayments"
                      nameKey="status"
                      label={(d) => `${d.status}`}
                    >
                      {(data.paymentStatusCounts ?? []).map((s, i) => (
                        <Cell
                          key={i}
                          fill={
                            s.status === "Paid"
                              ? "url(#gradPaid)"
                              : "url(#gradPending)"
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-col justify-center gap-3">
                <div className="flex items-center gap-2">
                  <Badge
                    className="rounded-full"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    Paid
                  </Badge>
                  <span className="text-sm">{paid} payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className="rounded-full"
                    style={{ backgroundColor: SECONDARY }}
                  >
                    Pending
                  </Badge>
                  <span className="text-sm">{pending} payments</span>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Paid Ratio</span>
                    <span className="font-medium">{paidPct}%</span>
                  </div>
                  <div className="w-64">
                    <Progress value={paidPct} className="[&>div]:bg-red-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Orders Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Orders Overview</CardTitle>
              <CardDescription>Monthly order count</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RBarChart data={ordersBar}>
                  <CartesianGrid stroke={NEUTRAL} strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="totalOrders"
                    radius={[8, 8, 0, 0]}
                    fill={PRIMARY}
                    name="Orders"
                  />
                </RBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Sales Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Sales Over Time</CardTitle>
              <CardDescription>Daily gross revenue</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RLineChart data={salesLine}>
                  <CartesianGrid stroke={NEUTRAL} strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="totalSales"
                    stroke={PRIMARY}
                    strokeWidth={2.5}
                    name="Revenue"
                    dot={{ r: 3 }}
                  />
                </RLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Revenue vs Expense (optional) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Revenue vs Expense</CardTitle>
              <CardDescription>
                {hasExpense ? (
                  <span>Compare daily revenue & expense</span>
                ) : (
                  <span className="text-amber-600">
                    No expense data provided — pass <code>expenseLineData</code>{" "}
                    to render this chart.
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {hasExpense ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revVsExp}>
                    <defs>
                      <linearGradient id="gradRev" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor={PRIMARY}
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor={PRIMARY}
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                      <linearGradient id="gradExp" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor={SECONDARY}
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor={SECONDARY}
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke={NEUTRAL} strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke={PRIMARY}
                      fill="url(#gradRev)"
                      name="Revenue"
                    />
                    <Area
                      type="monotone"
                      dataKey="expense"
                      stroke={SECONDARY}
                      fill="url(#gradExp)"
                      name="Expense"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
                  <p>
                    Add expenses API or compute costs to enable this comparison
                    chart.
                  </p>
                  {/* <div>
                    <code className="rounded bg-muted px-2 py-1">
                      expenseLineData:{" "}
                      {{ totalExpense: 320.5, date: "2025-08-13" }}
                    </code>
                  </div> */}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Today Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Today{`&apos;`}s Sales</CardTitle>
              <CardDescription>Real-time snapshot</CardDescription>
            </div>
            <Badge variant="outline" className="rounded-full">
              {new Date().toLocaleDateString()}
            </Badge>
          </CardHeader>
          <CardContent className="flex items-end justify-between gap-4">
            <div>
              <div
                className={`text-4xl font-bold ${
                  data.todaysSalesAmount > 0
                    ? "text-[#7c3f00]"
                    : "text-muted-foreground"
                }`}
              >
                {currency(data.todaysSalesAmount)}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Compared to average daily revenue
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border px-3 py-2">
              {data.todaysSalesAmount > 0 ? (
                <TrendingUp className="h-4 w-4 text-[#7c3f00]" />
              ) : (
                <TrendingDown className="h-4 w-4 text-gray-400" />
              )}
              <span className="text-sm font-medium">
                {data.todaysSalesAmount > 0 ? "Up" : "No sales yet"}
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Footer Helper */}
      <p className="text-center text-xs text-muted-foreground">
        Tip: This dashboard is fully responsive, uses gradients, soft shadows,
        rounded-2xl cards, and animated mounts with Framer Motion.
      </p>
    </div>
  );
}

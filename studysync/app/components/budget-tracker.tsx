"use client"

import { useState } from "react"
import { Plus, DollarSign, TrendingUp, TrendingDown, Calendar, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Transaction {
  id: number
  date: string
  amount: number
  type: "credit" | "debit"
  reason: string
  category: string
}

export default function BudgetTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      date: "2024-01-15",
      amount: 500,
      type: "credit",
      reason: "Monthly allowance from parents",
      category: "allowance",
    },
    {
      id: 2,
      date: "2024-01-15",
      amount: 45,
      type: "debit",
      reason: "Textbooks for Chemistry",
      category: "books",
    },
    {
      id: 3,
      date: "2024-01-14",
      amount: 25,
      type: "debit",
      reason: "Lunch at cafeteria",
      category: "food",
    },
    {
      id: 4,
      date: "2024-01-13",
      amount: 200,
      type: "credit",
      reason: "Part-time job payment",
      category: "income",
    },
  ])

  const [newTransaction, setNewTransaction] = useState({
    amount: "",
    type: "debit" as "credit" | "debit",
    reason: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  })

  const categories = [
    { value: "allowance", label: "Allowance" },
    { value: "income", label: "Part-time Income" },
    { value: "books", label: "Books & Supplies" },
    { value: "food", label: "Food & Dining" },
    { value: "transport", label: "Transportation" },
    { value: "entertainment", label: "Entertainment" },
    { value: "other", label: "Other" },
  ]

  const addTransaction = () => {
    if (newTransaction.amount && newTransaction.reason && newTransaction.category) {
      const transaction: Transaction = {
        id: Date.now(),
        date: newTransaction.date,
        amount: Number.parseFloat(newTransaction.amount),
        type: newTransaction.type,
        reason: newTransaction.reason,
        category: newTransaction.category,
      }
      setTransactions([transaction, ...transactions])
      setNewTransaction({
        amount: "",
        type: "debit",
        reason: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
      })
    }
  }

  const deleteTransaction = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  const getTotalBalance = () => {
    return transactions.reduce((total, transaction) => {
      return transaction.type === "credit" ? total + transaction.amount : total - transaction.amount
    }, 0)
  }

  const getTotalCredits = () => {
    return transactions.filter((t) => t.type === "credit").reduce((total, t) => total + t.amount, 0)
  }

  const getTotalDebits = () => {
    return transactions.filter((t) => t.type === "debit").reduce((total, t) => total + t.amount, 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Budget Tracker</h2>
          <p className="text-gray-600">Track your income and expenses</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
              <DialogDescription>Record a new income or expense transaction.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="transaction-type">Type</Label>
                  <Select
                    value={newTransaction.type}
                    onValueChange={(value: "credit" | "debit") => setNewTransaction({ ...newTransaction, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit">Money In (Credit)</SelectItem>
                      <SelectItem value="debit">Money Out (Debit)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="transaction-amount">Amount ($)</Label>
                  <Input
                    id="transaction-amount"
                    type="number"
                    step="0.01"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="transaction-category">Category</Label>
                <Select
                  value={newTransaction.category}
                  onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="transaction-reason">Reason/Description</Label>
                <Input
                  id="transaction-reason"
                  value={newTransaction.reason}
                  onChange={(e) => setNewTransaction({ ...newTransaction, reason: e.target.value })}
                  placeholder="What was this transaction for?"
                />
              </div>
              <div>
                <Label htmlFor="transaction-date">Date</Label>
                <Input
                  id="transaction-date"
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                />
              </div>
              <Button onClick={addTransaction} className="w-full">
                Add Transaction
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getTotalBalance() >= 0 ? "text-green-600" : "text-red-600"}`}>
              ${getTotalBalance().toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Total available funds</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${getTotalCredits().toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Money received</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${getTotalDebits().toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Money spent</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Transaction History
          </CardTitle>
          <CardDescription>All your financial transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount Credited/Debited</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {transaction.type === "credit" ? (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          +${transaction.amount.toFixed(2)}
                        </Badge>
                      ) : (
                        <Badge variant="destructive">-${transaction.amount.toFixed(2)}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{transaction.reason}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{categories.find((c) => c.value === transaction.category)?.label}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => deleteTransaction(transaction.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

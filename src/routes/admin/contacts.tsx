import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery } from 'convex/react'
import {
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Edit2,
  Mail,
  MessageSquare,
  MessageSquareDiff,
  MoreHorizontal,
  Phone,
  Plus,
  Save,
  Trash2,
  X,
  XCircle,
} from 'lucide-react'
import { useState } from 'react'
import { api } from '../../../convex/_generated/api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export const Route = createFileRoute('/admin/contacts')({
  component: AdminLeads,
})

const STATUS_CONFIG: Record<
  string,
  { label: string; icon: any; color: string }
> = {
  new: {
    label: 'New',
    icon: Clock,
    color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  },
  contacted: {
    label: 'Contacted',
    icon: MessageSquare,
    color: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  },
  qualified: {
    label: 'Qualified',
    icon: CheckCircle2,
    color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  },
  closed: {
    label: 'Closed',
    icon: XCircle,
    color: 'bg-muted text-muted-foreground border-border',
  },
}

function AdminLeads() {
  const leads = useQuery(api.leads.list as any)
  const addLead = useMutation(api.leads.addLead as any)
  const updateLead = useMutation(api.leads.updateLead as any)
  const deleteLead = useMutation(api.leads.deleteLead as any)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    notes: '',
  })

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
      notes: '',
    })
    setEditingLead(null)
  }

  const handleEdit = (lead: any) => {
    setEditingLead(lead)
    setFormData({
      name: lead.name,
      email: lead.email,
      company: lead.company || '',
      phone: lead.phone || '',
      message: lead.message,
      notes: lead.notes || '',
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingLead) {
        await updateLead({
          id: editingLead._id,
          ...formData,
        })
      } else {
        await addLead(formData)
      }
      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error('Failed to save contact:', error)
    }
  }

  const handleStatusChange = async (id: any, status: string) => {
    try {
      await updateLead({ id, status })
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  const handleDelete = async (id: any) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteLead({ id })
      } catch (error) {
        console.error('Failed to delete lead:', error)
      }
    }
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black font-display tracking-tight text-foreground">
            Customer <span className="text-primary italic">Relationships</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your contacts, prospects, and business inquiries.
          </p>
        </div>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger>
            <Button className="w-fit">
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingLead ? 'Edit Contact' : 'Add New Contact'}
              </DialogTitle>
              <DialogDescription>
                Fill in the details below to {editingLead ? 'update' : 'create'} a
                contact in your CRM.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="company">Company</FieldLabel>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="phone">Phone</FieldLabel>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="message">Initial Inquiry/Message</FieldLabel>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="notes">Internal Notes</FieldLabel>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Private notes for team use..."
                />
              </Field>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingLead ? 'Update Contact' : 'Create Contact'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      {!leads ? (
        <div className="p-20 border border-dashed border-border/60 rounded-2xl flex flex-col items-center justify-center bg-muted/5">
          <p className="text-muted-foreground animate-pulse">
            Initializing connection to Convex...
          </p>
        </div>
      ) : leads.length === 0 ? (
        <div className="p-20 border border-dashed border-border/60 rounded-2xl flex flex-col items-center justify-center bg-muted/5">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2 text-foreground">
              No Contacts Yet
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              When potential customers fill out the contact form, they will appear
              here.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {leads.map((lead: any) => {
            const status =
              STATUS_CONFIG[lead.status as keyof typeof STATUS_CONFIG] ||
              STATUS_CONFIG.new
            const StatusIcon = status.icon

            return (
              <Card
                key={lead._id}
                className="overflow-hidden border-border/40 hover:border-border/80 transition-all bg-card/50 backdrop-blur-sm group"
              >
                <CardHeader className="p-6 pb-0">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl font-bold">
                          {lead.name}
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className={`flex items-center gap-1 py-0 px-2 h-5 text-[10px] uppercase font-bold tracking-wider ${status.color}`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </Badge>
                      </div>
                      <CardDescription className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                        <span className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5" /> {lead.email}
                        </span>
                        {lead.phone && (
                          <span className="flex items-center gap-1.5">
                            <Phone className="h-3.5 w-3.5" /> {lead.phone}
                          </span>
                        )}
                        {lead.company && (
                          <span className="flex items-center gap-1.5">
                            <Building2 className="h-3.5 w-3.5" /> {lead.company}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />{' '}
                          {new Date(lead._creationTime).toLocaleDateString()}
                        </span>
                      </CardDescription>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 -mr-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => handleEdit(lead)}>
                          <Edit2 className="mr-2 h-4 w-4" /> Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-blue-500"
                          onClick={() => handleStatusChange(lead._id, 'new')}
                        >
                          Mark as New
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-orange-500"
                          onClick={() => handleStatusChange(lead._id, 'contacted')}
                        >
                          Mark as Contacted
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-emerald-500"
                          onClick={() => handleStatusChange(lead._id, 'qualified')}
                        >
                          Mark as Qualified
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-muted-foreground"
                          onClick={() => handleStatusChange(lead._id, 'closed')}
                        >
                          Mark as Closed
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(lead._id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Contact
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="bg-muted/30 rounded-lg p-4 border border-border/20">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap italic text-foreground/80">
                      "{lead.message}"
                    </p>
                  </div>

                  <CommentSection leadId={lead._id} />

                  {lead.notes && (
                    <div className="mt-4 text-xs text-muted-foreground border-t border-border/20 pt-4">
                      <strong>Internal Notes:</strong> {lead.notes}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

function CommentSection({ leadId }: { leadId: any }) {
  const comments = useQuery(api.comments.list, { leadId })
  const addComment = useMutation(api.comments.add)
  const updateComment = useMutation(api.comments.update)
  const deleteComment = useMutation(api.comments.remove)

  const [isExpanded, setIsExpanded] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [editingId, setEditingId] = useState<any>(null)
  const [editContent, setEditContent] = useState('')

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return
    try {
      await addComment({ leadId, content: newComment })
      setNewComment('')
    } catch (error) {
      console.error('Failed to add comment:', error)
    }
  }

  const handleEdit = (comment: any) => {
    setEditingId(comment._id)
    setEditContent(comment.content)
  }

  const handleSaveEdit = async () => {
    try {
      await updateComment({ id: editingId, content: editContent })
      setEditingId(null)
    } catch (error) {
      console.error('Failed to update comment:', error)
    }
  }

  const handleDelete = async (id: any) => {
    if (confirm('Are you sure you want to delete this comment?')) {
      try {
        await deleteComment({ id })
      } catch (error) {
        console.error('Failed to delete comment:', error)
      }
    }
  }

  return (
    <div className="mt-6 border-t border-border/20 pt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mb-2"
      >
        <MessageSquareDiff className="h-4 w-4" />
        {isExpanded ? 'Hide Comments' : `Show Comments ${comments?.length ? `(${comments.length})` : ''}`}
      </button>

      {isExpanded && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <form onSubmit={handleAdd} className="flex gap-2">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 h-9 bg-background/50 border-border/40 focus:border-primary/50 text-sm"
            />
            <Button type="submit" size="sm" className="h-9 px-4 shrink-0">
              Add
            </Button>
          </form>

          <div className="space-y-3">
            {!comments ? (
              <div className="h-2 w-24 bg-muted animate-pulse rounded" />
            ) : comments.length === 0 ? (
              <p className="text-xs text-muted-foreground italic pl-1">No comments yet.</p>
            ) : (
              comments.map((comment: any) => (
                <div
                  key={comment._id}
                  className="group relative bg-muted/20 border border-border/10 rounded-lg p-3 hover:border-border/40 transition-all"
                >
                  {editingId === comment._id ? (
                    <div className="space-y-3">
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="text-sm bg-background border-border min-h-[60px]"
                        autoFocus
                      />
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => setEditingId(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          className="h-8 px-3"
                          onClick={handleSaveEdit}
                        >
                          <Save className="mr-2 h-3.5 w-3.5" /> Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          {comment.author} • {new Date(comment._creationTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                        </span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                            onClick={() => handleEdit(comment)}
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                            onClick={() => handleDelete(comment._id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                        {comment.content}
                      </p>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

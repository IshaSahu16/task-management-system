export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export const isOverdue = (dueDate, status) => {
  if (status === 'completed') return false;
  return new Date(dueDate) < new Date();
};

//visibility class
export const getPriorityColor = (priority) => {
  const colors = {
    urgent: 'bg-purple-100 text-purple-800 border-purple-300',
    high: 'bg-red-100 text-red-800 border-red-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    low: 'bg-green-100 text-green-800 border-green-300',
  };
  return colors[priority] || colors.low;
};

// priority color
export const getPriorityBadgeColor = (priority) => {
  const colors = {
    urgent: 'bg-purple-600',
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  };
  return colors[priority] || colors.low;
};

// stat color
export const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-gray-100 text-gray-800 border-gray-300',
    'in-progress': 'bg-blue-100 text-blue-800 border-blue-300',
    completed: 'bg-green-100 text-green-800 border-green-300',
  };
  return colors[status] || colors.pending;
};

export const getStatusBadgeColor = (status) => {
  const colors = {
    pending: 'bg-gray-500',
    'in-progress': 'bg-blue-500',
    completed: 'bg-green-500',
  };
  return colors[status] || colors.pending;
};

export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
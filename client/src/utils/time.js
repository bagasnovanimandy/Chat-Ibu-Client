import {
    format,
    formatDistanceToNow
} from 'date-fns';
import {
    id
} from 'date-fns/locale';

export const formatTime = (date) => {
    return format(new Date(date), 'HH:mm', {
        locale: id
    });
};

export const formatDate = (date) => {
    return format(new Date(date), 'dd MMM yyyy', {
        locale: id
    });
};

export const formatRelativeTime = (date) => {
    return formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: id
    });
};
export const timeStringValid = (dateTimeString: string): Date|null => {
    // Regular expression to match the "YYYY-MM-DD HH:mm:ss" format
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

    // Test the format using the regular expression
    if (!regex.test(dateTimeString)) {
        return null;
    }

    // Split the date and time parts
    const [datePart, timePart] = dateTimeString.split(' ');

    // Further split the date and time parts
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);

    // Create a new Date object
    const date = new Date(year, month - 1, day, hours, minutes, seconds);

    // Check the components to ensure validity
    if (date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day ||
        date.getHours() !== hours ||
        date.getMinutes() !== minutes ||
        date.getSeconds() !== seconds) {
        return null;
    }

    return date;
}
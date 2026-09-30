function outputCartRow(file, title, quantity, price, total) {
    document.write('<tr>');
    document.write('<td>');
    document.write('<img src="images2/' + file + '" alt="' + title + '">');
    document.write('</td>');
    document.write('<td>' + title + '</td>');
    document.write('<td class="center">' + quantity + '</td>');
    document.write('<td class="right">RM' + price.toFixed(2) + '</td>');
    document.write('<td class="right">RM' + total.toFixed(2) + '</td>');
    document.write('</tr>');
}

function calculateTotal(quantity, price) {
    return quantity * price;
}

function calculateTax(subtotal, rate) {
    return subtotal * rate;
}

function calculateShipping(subtotal, threshold) {
    if (subtotal > threshold) {
        return 0;
    } else {
        return 40;
    }
}

function calculateGrandTotal(subtotal, tax, shipping) {
    return subtotal + tax + shipping;
}

function outputCurrency(num) {
    document.write(num.toFixed(2));
}
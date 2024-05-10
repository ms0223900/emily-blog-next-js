const productDetailIdxMap = {
    name: 0,
    spec: 1,
    amount: 2,
    singlePrice: 3,
};
const PRODUCT_DETAIL = {
    name: 'name',
    spec: 'spec',
    amount: 'amount',
    singlePrice: 'singlePrice',
};

function getInputSheet() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const inputsSheet = ss.getSheetByName('main');
    return inputsSheet;
}

class CustomerInfoRepo {

    constructor(sheet) {
        this.inputsSheet = sheet;
    }

    getName() {
        return this.inputsSheet.getRange('B4').getValue();
    }

    getCustomerName() {
        return this.inputsSheet.getRange('B5').getValue();
    }

    getPhoneNum() {
        return this.inputsSheet.getRange('B6').getValue();
    }

    getVatNum() {
        return this.inputsSheet.getRange('B7').getValue();
    }

    getHeading() {
        return this.inputsSheet.getRange('B8').getValue();
    }

    getEmail() {
        return this.inputsSheet.getRange('B9').getValue();
    }

    getWholeCustomInfo() {
        return this.inputsSheet.getRange('B3').getValue();
    }
}

function makeCustomerInfo() {
    const inputsSheet = getInputSheet();

    const customerInfoRepo = new CustomerInfoRepo(inputsSheet);
    if (customerInfoRepo.getWholeCustomInfo()) {
        return customerInfoRepo.getWholeCustomInfo();
    }
    return `1. 公司名稱: ${customerInfoRepo.getName()}
2. 聯絡人姓名: ${customerInfoRepo.getCustomerName()}
3. 聯繫電話: ${customerInfoRepo.getPhoneNum()}
4. E-mail: ${customerInfoRepo.getEmail()}
5. 抬頭: ${customerInfoRepo.getHeading()}
6. 統編: ${customerInfoRepo.getVatNum()}`
}

function main() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    const newQuotationSheetName = 'temp:)' + Math.random().toString().slice(0, 5);
    copyTemplateSheet(newQuotationSheetName);

    const inputsSheet = ss.getSheetByName('main');
    const newQuotationSheet = ss.getSheetByName(newQuotationSheetName);

    const customerInfoRange = newQuotationSheet.getRange('A3:F3');
    customerInfoRange.setValue(makeCustomerInfo());

    const dateRange = newQuotationSheet.getRange('A4:F4');
    dateRange.setValue('7. 報價日期: ' + new Date().toLocaleDateString('zh-TW'));

    const productNameRange = newQuotationSheet.getRange('A6:A7');

    function getProduct1Details(colName) {
        return getProductDetails(16, colName);
    }

    productNameRange.setValue(getProduct1Details(PRODUCT_DETAIL.name));

    const productSpecRange = newQuotationSheet.getRange('B6:B7');
    productSpecRange.setValue(getProduct1Details(PRODUCT_DETAIL.spec));
    productSpecRange.merge();

    const productPriceRange = newQuotationSheet.getRange('D6:E7');
    productPriceRange.setValue(getProduct1Details(PRODUCT_DETAIL.singlePrice));

    const productAmountRange = newQuotationSheet.getRange('C6:C7');
    productAmountRange.setValue(getProduct1Details(PRODUCT_DETAIL.amount));

    const totalPriceRange = newQuotationSheet.getRange('F6:F7');
    totalPriceRange.setFormula('=C6*D6');

    // product 2
    const product2Name = getProduct2Details(PRODUCT_DETAIL.name);
    if (!product2Name) return;

    newQuotationSheet.insertRowsAfter(7, 2);

    const product2Range = newQuotationSheet.getRange('A8:A9');
    product2Range.merge();

    function getProduct2Details(colName) {
        return getProductDetails(20, colName);
    }

    function getProductDetails(startRow, colName) {
        return inputsSheet.getRange(startRow + productDetailIdxMap[colName], 2).getValue();
    }

    const PRODUCT_2_START_ROW = 8;
    const name2Range = newQuotationSheet.getRange(PRODUCT_2_START_ROW, 1);
    name2Range.setValue(getProduct2Details(PRODUCT_DETAIL.name));

    const product2SpecRange = newQuotationSheet.getRange(PRODUCT_2_START_ROW, 2);
    product2SpecRange.setValue(getProduct2Details(PRODUCT_DETAIL.spec));

    const amount2Range = newQuotationSheet.getRange(PRODUCT_2_START_ROW, 3, 2);
    amount2Range.setValue(getProduct2Details(PRODUCT_DETAIL.amount));
    amount2Range.merge();

    const product2SinglePriceRange = newQuotationSheet.getRange(PRODUCT_2_START_ROW, 4, 2, 2);
    product2SinglePriceRange.setValue(getProduct2Details(PRODUCT_DETAIL.singlePrice));
    product2SinglePriceRange.merge();
}

function getTemplateSheet() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const templateSheet = ss.getSheetByName('template');
    return templateSheet;
}

function copyTemplateSheet(newName = '') {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    return getTemplateSheet().copyTo(ss).setName(newName);
}

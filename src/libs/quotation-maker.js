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

const PRODUCT_START_ROW = 16;

function getProductDetails(productSeq, colName) {
    const PRODUCT_START_COL = 1;
    return getInputSheet().getRange(PRODUCT_START_ROW + productDetailIdxMap[colName], PRODUCT_START_COL + productSeq).getValue();
}

function getProduct2Details(colName) {
    return getProductDetails(2, colName);
}

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
        const wholeCustomInfo = this.getWholeCustomInfo();
        if (wholeCustomInfo) {
            return wholeCustomInfo.split('\n')[5].split(/：|:\s?/)[1];
        }
        return this.inputsSheet.getRange('B8').getValue();
    }

    getEmail() {
        return this.inputsSheet.getRange('B9').getValue();
    }

    getWholeCustomInfo() {
        return this.inputsSheet.getRange('B3').getValue();
    }

    get() {
        const wholeCustomInfo = this.getWholeCustomInfo();
        if (wholeCustomInfo) {
            return wholeCustomInfo;
        }
        return `1. 公司名稱: ${this.getName()}
        2. 聯絡人姓名: ${this.getCustomerName()}
        3. 聯繫電話: ${this.getPhoneNum()}
        4. E-mail: ${this.getEmail()}
        5. 抬頭: ${this.getHeading()}
        6. 統編: ${this.getVatNum()}`;
    }
}

function makeCustomerInfo() {
    const inputsSheet = getInputSheet();

    const customerInfoRepo = new CustomerInfoRepo(inputsSheet);
    return customerInfoRepo.get();
}

function setProductValues(newQuotationSheet, productSeq = 1) {
    const productName = getProductDetails(productSeq, PRODUCT_DETAIL.name);
    if (!productName) return

    // TODO, dynamic get range
    const productNameRange = newQuotationSheet.getRange('A6:A7');
    productNameRange.setValue(productName);

    const productSpecRange = newQuotationSheet.getRange('B6:B7');
    productSpecRange.setValue(getProductDetails(productSeq, PRODUCT_DETAIL.spec));
    productSpecRange.merge();

    const productPriceRange = newQuotationSheet.getRange('D6:E7');
    productPriceRange.setValue(getProductDetails(productSeq, PRODUCT_DETAIL.singlePrice));

    const productAmountRange = newQuotationSheet.getRange('C6:C7');
    productAmountRange.setValue(getProductDetails(productSeq, PRODUCT_DETAIL.amount));

    const totalPriceRange = newQuotationSheet.getRange('F6:F7');
    totalPriceRange.setFormula('=C6*D6');
}

function setProduct2Values(newQuotationSheet) {
    const product2Range = newQuotationSheet.getRange('A8:A9');
    product2Range.merge();

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

function makeQuotationSheetName() {
    const firstProductName = getProductDetails(1, PRODUCT_DETAIL.name);
    const customerTitle = new CustomerInfoRepo(getInputSheet()).getHeading()
    return `${firstProductName}-報價單 for ${customerTitle}`;
}

function main() {
    const newQuotationSheetName = makeQuotationSheetName();
    const newSS = SpreadsheetApp.create(newQuotationSheetName);
    const newTabName = 'v1';
    copyTemplateSheet(newSS, newTabName)
    const newSheet = newSS.getSheetByName(newTabName);

    const newQuotationSheet = newSheet;

    const customerInfoRange = newQuotationSheet.getRange('A3:F3');
    customerInfoRange.setValue(makeCustomerInfo());

    const dateRange = newQuotationSheet.getRange('A4:F4');
    dateRange.setValue('7. 報價日期: ' + new Date().toLocaleDateString('zh-TW'));

    setProductValues(newQuotationSheet, 1);

    // product 2
    const product2Name = getProduct2Details(PRODUCT_DETAIL.name);
    if (!product2Name) return;

    newQuotationSheet.insertRowsAfter(7, 2);
    setProduct2Values(newQuotationSheet);

    console.log(newSS.getUrl());
}

function getTemplateSheet() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const templateSheet = ss.getSheetByName('template');
    return templateSheet;
}

function copyTemplateSheet(activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(), newName = '') {
    return getTemplateSheet().copyTo(activeSpreadsheet).setName(newName);
}

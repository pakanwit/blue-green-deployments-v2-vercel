import React from 'react';
import { useEffect } from 'react';

export default function FinTable({
  investmentItem1,
  investmentAmountItem1,

  investmentItem2,
  investmentAmountItem2,

  investmentItem3,
  investmentAmountItem3,

  investmentItem4,
  investmentAmountItem4,

  investmentItem5,
  investmentAmountItem5,

  investmentItem6,
  investmentAmountItem6,

  investmentItem7,
  investmentAmountItem7,

  investmentItem8,
  investmentAmountItem8,

  investmentItem9,
  investmentAmountItem9,

  investmentItem10,
  investmentAmountItem10,

  initialInvestmentAmount,
  firstYearRevenue,
  revenueGrowthRate,

  COGSP,
  wageCostP,
  markCostP,
  rentCostP,
  genCostP,
  depreCostP,
  utilCostP,
  otherCostP,
  intCostP,
  taxCostP,
  planLanguage,
  planCurrency,
  planCurrencySymbol,
}) {
  // Monthly Income Statement -----------------------------

  function makeRevenue(firstYearRevenue) {
    const revenueF = [];
    const firstRevenue = 0.05 * firstYearRevenue;
    revenueF[0] = firstRevenue;
    const increasingPercent = 0.0888254044023916;

    for (let i = 1; i < 12; i++) {
      revenueF[i] = Math.round(revenueF[i - 1] * (1 + increasingPercent));
    }

    return revenueF;
  }

  function makeDeduct(principle, deductor) {
    const result = [];

    for (let i = 0; i < 12; i++) {
      result[i] = principle[i] - deductor[i];
    }
    return result;
  }

  function makeCost(revenue, costPercent) {
    const CostF = [];
    for (let i = 0; i < 12; i++) {
      CostF[i] = Math.round(revenue[i] * costPercent);
    }
    return CostF;
  }

  function makeCostRent(revenue, costPercent) {
    const CostF = [];
    for (let i = 0; i < 12; i++) {
      CostF[i] = Math.round((firstYearRevenue * costPercent) / 12);
    }
    return CostF;
  }

  function makeTotalExpense(
    wageCostF,
    markCostF,
    rentCostF,
    genCostF,
    depreCostF,
    utilCostF,
    otherCostF,
  ) {
    const totalExpenseF = [];

    for (let i = 0; i < 12; i++) {
      totalExpenseF[i] =
        wageCostF[i] +
        markCostF[i] +
        rentCostF[i] +
        genCostF[i] +
        depreCostF[i] +
        utilCostF[i] +
        otherCostF[i];
    }

    return totalExpenseF;
  }

  const revenue = makeRevenue(firstYearRevenue);
  const COGS = makeCost(revenue, COGSP);
  const grossMargin = makeDeduct(revenue, COGS);

  const wageCost = makeCost(revenue, wageCostP);
  const markCost = makeCost(revenue, markCostP);
  const rentCost = makeCostRent(revenue, rentCostP);
  const genCost = makeCost(revenue, genCostP);
  const depreCost = makeCost(revenue, depreCostP);
  const utilCost = makeCost(revenue, utilCostP);
  const otherCost = makeCost(revenue, otherCostP);
  const totalExpense = makeTotalExpense(
    wageCost,
    markCost,
    rentCost,
    genCost,
    depreCost,
    utilCost,
    otherCost,
  );

  const EBIT = makeDeduct(grossMargin, totalExpense);
  const intCost = makeCost(revenue, intCostP);
  const EBT = makeDeduct(EBIT, intCost);
  const taxCost = makeCost(EBT, taxCostP);
  const netIncome = makeDeduct(EBT, taxCost);

  //get the first 6 value of revenue, COGS, grossMargin, markCost rentCost,genCost,depreCost,utilCost,otherCost,totalExpense
  const revenue1 = revenue.slice(0, 6);
  const COGS1 = COGS.slice(0, 6);
  const grossMargin1 = grossMargin.slice(0, 6);
  const wageCost1 = wageCost.slice(0, 6);
  const markCost1 = markCost.slice(0, 6);
  const rentCost1 = rentCost.slice(0, 6);
  const genCost1 = genCost.slice(0, 6);
  const depreCost1 = depreCost.slice(0, 6);
  const utilCost1 = utilCost.slice(0, 6);
  const otherCost1 = otherCost.slice(0, 6);
  const totalExpense1 = totalExpense.slice(0, 6);

  const EBIT1 = EBIT.slice(0, 6);
  const intCost1 = intCost.slice(0, 6);
  const EBT1 = EBT.slice(0, 6);
  const taxCost1 = taxCost.slice(0, 6);
  const netIncome1 = netIncome.slice(0, 6);

  //get the last 6 value of revenue, COGS, grossMargin, markCost rentCost,genCost,depreCost,utilCost,otherCost,totalExpense
  const revenue2 = revenue.slice(6, 12);
  const COGS2 = COGS.slice(6, 12);
  const grossMargin2 = grossMargin.slice(6, 12);
  const wageCost2 = wageCost.slice(6, 12);
  const markCost2 = markCost.slice(6, 12);
  const rentCost2 = rentCost.slice(6, 12);
  const genCost2 = genCost.slice(6, 12);
  const depreCost2 = depreCost.slice(6, 12);
  const utilCost2 = utilCost.slice(6, 12);
  const otherCost2 = otherCost.slice(6, 12);
  const totalExpense2 = totalExpense.slice(6, 12);

  const EBIT2 = EBIT.slice(6, 12);
  const intCost2 = intCost.slice(6, 12);
  const EBT2 = EBT.slice(6, 12);
  const taxCost2 = taxCost.slice(6, 12);
  const netIncome2 = netIncome.slice(6, 12);

  // FY---------------------------------------------------------
  const revenueFY = firstYearRevenue;
  const COGSFY = firstYearRevenue * COGSP;
  const grossMarginFY = revenueFY - COGSFY;

  const wageCostFY = firstYearRevenue * wageCostP;
  const markCostFY = firstYearRevenue * markCostP;
  const rentCostFY = firstYearRevenue * rentCostP;
  const genCostFY = firstYearRevenue * genCostP;
  const depreCostFY = firstYearRevenue * depreCostP;
  const utilCostFY = firstYearRevenue * utilCostP;
  const otherCostFY = firstYearRevenue * otherCostP;
  const totalExpenseFY =
    wageCostFY +
    markCostFY +
    rentCostFY +
    genCostFY +
    depreCostFY +
    utilCostFY +
    otherCostFY;

  const EBITFY = grossMarginFY - totalExpenseFY;
  const intCostFY = firstYearRevenue * intCostP;

  const EBTFY = EBITFY - intCostFY;
  const taxCostFY = EBTFY * taxCostP;

  const netIncomeFY = EBTFY - taxCostFY;

  // Yearly Income Statement---------------------------------------------

  function makeRevenueYear() {
    const revenueYearF = [];
    revenueYearF[0] = firstYearRevenue;
    for (let i = 1; i < 5; i++) {
      revenueYearF[i] = Math.round(
        revenueYearF[i - 1] * (1 + revenueGrowthRate),
      );
    }
    return revenueYearF;
  }

  function makeDeductYear(principle, deductor) {
    const result = [];

    for (let i = 0; i < 5; i++) {
      result[i] = principle[i] - deductor[i];
    }
    return result;
  }

  function makeCostYear(revenue, costPercent) {
    const CostF = [];
    for (let i = 0; i < 5; i++) {
      CostF[i] = Math.round(revenue[i] * costPercent);
    }
    return CostF;
  }

  function makeCostYearRent(revenue, costPercent) {
    const CostF = [];
    for (let i = 0; i < 5; i++) {
      CostF[i] = Math.round(firstYearRevenue * costPercent);
    }
    return CostF;
  }

  function makeTotalExpenseYear(
    wageCostF,
    markCostF,
    rentCostF,
    genCostF,
    depreCostF,
    utilCostF,
    otherCostF,
  ) {
    const totalExpenseF = [];

    for (let i = 0; i < 5; i++) {
      totalExpenseF[i] =
        wageCostF[i] +
        markCostF[i] +
        rentCostF[i] +
        genCostF[i] +
        depreCostF[i] +
        utilCostF[i] +
        otherCostF[i];
    }

    return totalExpenseF;
  }

  const revenueYear = makeRevenueYear();
  const COGSYear = makeCostYear(revenueYear, COGSP);
  const grossMarginYear = makeDeductYear(revenueYear, COGSYear);

  const wageCostYear = makeCostYear(revenueYear, wageCostP);
  const markCostYear = makeCostYear(revenueYear, markCostP);
  const rentCostYear = makeCostYearRent(revenueYear, rentCostP);
  const genCostYear = makeCostYear(revenueYear, genCostP);
  const depreCostYear = makeCostYear(revenueYear, depreCostP);
  const utilCostYear = makeCostYear(revenueYear, utilCostP);
  const otherCostYear = makeCostYear(revenueYear, otherCostP);
  const totalExpenseYear = makeTotalExpenseYear(
    wageCostYear,
    markCostYear,
    rentCostYear,
    genCostYear,
    depreCostYear,
    utilCostYear,
    otherCostYear,
  );

  const EBITYear = makeDeductYear(grossMarginYear, totalExpenseYear);
  const intCostYear = makeCostYear(revenueYear, intCostP);

  const EBTYear = makeDeductYear(EBITYear, intCostYear);
  const taxCostYear = makeCostYear(EBTYear, taxCostP);

  const netIncomeYear = makeDeductYear(EBTYear, taxCostYear);

  const tableStyle: React.CSSProperties = {
    borderCollapse: 'collapse',
  };

  const boldCellStyle: React.CSSProperties = {
    fontSize: '11pt',
    textAlign: 'left',
    border: '1px solid black',
    padding: '2px',
    fontWeight: 'bold',
  };

  const notBoldCellStyle: React.CSSProperties = {
    fontSize: '11pt',
    textAlign: 'left',
    border: '1px solid black',
    padding: '2px',
    fontWeight: 'normal',
  };

  const indentCellStyle: React.CSSProperties = {
    fontSize: '11pt',
    textAlign: 'left',
    border: '1px solid black',
    padding: '2px',
    fontWeight: 'normal',
    textIndent: '20px',
  };

  const wordsEN = {
    finance: 'Finance',
    initialInvestment: 'Initial Investment',
    investmentItem: 'Investment Item',
    cost: 'Cost',
    total: 'Total',
    firstYearIncomeStatement: 'First Year Income Statement',
    firstYearIncomeStatementJanJun: 'First Year Income Statement Jan - Jun',
    jan: 'Jan',
    feb: 'Feb',
    mar: 'Mar',
    apr: 'Apr',
    may: 'May',
    jun: 'Jun',
    jul: 'Jul',
    aug: 'Aug',
    sep: 'Sep',
    oct: 'Oct',
    nov: 'Nov',
    dec: 'Dec',
    firstYear: 'First Year',
    revenue: 'Revenue',
    cogs: 'Cost of Goods Sold',
    grossMargin: 'Gross Margin',
    operatingExpenses: 'Operating Expenses',
    wagesAndBenefits: 'Wages and Benefits',
    marketing: 'Marketing',
    rent: 'Rent',
    generalAdministrative: 'General Administrative',
    depreciation: 'Depreciation',
    utilities: 'Utilities',
    otherExpenses: 'Other Expenses',
    totalExpenses: 'Total Expenses',
    earningsBeforeInterestTaxes: 'Earnings Before Interest and Taxes',
    interestExpense: 'Interest Expense',
    earningsBeforeTaxes: 'Earnings Before Taxes',
    incomeTaxes: 'Income Taxes',
    netIncome: 'Net Income',
    firstYearIncomeStatementJulDec: 'First Year Income Statement Jul - Dec ',
    year1_5IncomeStatement: 'Income Statement Year 1 - 5',
    year1: 'Year 1',
    year2: 'Year 2',
    year3: 'Year 3',
    year4: 'Year 4',
    year5: 'Year 5',
    planCurrency: '',
    planCurrencySymbol: '',
  };

  const wordsDE = {
    finance: 'Finanzen',
    initialInvestment: 'Erstinvestition',
    investmentItem: 'Investitionsposten',
    cost: 'Kosten',
    total: 'Gesamt',
    firstYearIncomeStatement: 'Ergebnisrechnung Erstes Jahr',
    firstYearIncomeStatementJanJun: 'Ergebnisrechnung Erstes Jahr Jan - Jun',
    jan: 'Jan',
    feb: 'Feb',
    mar: 'Mär',
    apr: 'Apr',
    may: 'Mai',
    jun: 'Jun',
    jul: 'Jul',
    aug: 'Aug',
    sep: 'Sep',
    oct: 'Okt',
    nov: 'Nov',
    dec: 'Dez',
    firstYear: 'Erstes Jahr',
    revenue: 'Einnahmen',
    cogs: 'Kosten der verkauften Waren',
    grossMargin: 'Bruttomarge',
    operatingExpenses: 'Betriebskosten',
    wagesAndBenefits: 'Löhne und Leistungen',
    marketing: 'Marketing',
    rent: 'Miete',
    generalAdministrative: 'Allgemeine Verwaltung',
    depreciation: 'Abschreibung',
    utilities: 'Nebenkosten',
    otherExpenses: 'Andere Ausgaben',
    totalExpenses: 'Gesamtausgaben',
    earningsBeforeInterestTaxes: 'Ergebnis vor Zinsen und Steuern',
    interestExpense: 'Zinsaufwand',
    earningsBeforeTaxes: 'Ergebnis vor Steuern',
    incomeTaxes: 'Einkommensteuer',
    netIncome: 'Nettoeinkommen',
    firstYearIncomeStatementJulDec: 'Ergebnisrechnung Erstes Jahr Jul - Dez',
    year1_5IncomeStatement: 'Ergebnisrechnung Jahr 1 - 5',
    year1: 'Jahr 1',
    year2: 'Jahr 2',
    year3: 'Jahr 3',
    year4: 'Jahr 4',
    year5: 'Jahr 5',
    planCurrency: '',
    planCurrencySymbol: '',
  };

  const wordsFR = {
    finance: 'Finance',
    initialInvestment: 'Investissement Initial',
    investmentItem: "Article d'Investissement",
    cost: 'Coût',
    total: 'Total',
    firstYearIncomeStatement: 'Compte de Résultat Première Année',
    firstYearIncomeStatementJanJun: 'Compte de Résultat Jan - Juin',
    jan: 'Jan',
    feb: 'Fév',
    mar: 'Mar',
    apr: 'Avr',
    may: 'Mai',
    jun: 'Juin',
    jul: 'Juil',
    aug: 'Août',
    sep: 'Sep',
    oct: 'Oct',
    nov: 'Nov',
    dec: 'Déc',
    firstYear: 'Première Année',
    revenue: 'Revenu',
    cogs: 'Coût des Biens Vendus',
    grossMargin: 'Marge Brute',
    operatingExpenses: "Frais d'Exploitation",
    wagesAndBenefits: 'Salaires et Avantages',
    marketing: 'Marketing',
    rent: 'Loyer',
    generalAdministrative: 'Administratif Général',
    depreciation: 'Amortissement',
    utilities: 'Services Publics',
    otherExpenses: 'Autres Dépenses',
    totalExpenses: 'Dépenses Totales',
    earningsBeforeInterestTaxes: 'Résultat Avant Intérêts et Impôts',
    interestExpense: "Frais d'Intérêt",
    earningsBeforeTaxes: 'Résultat Avant Impôts',
    incomeTaxes: 'Impôt sur le Revenu',
    netIncome: 'Revenu Net',
    firstYearIncomeStatementJulDec: 'Compte de Résultat Juil - Déc',
    year1_5IncomeStatement: 'Compte de Résultat Année 1 - 5',
    year1: 'Année 1',
    year2: 'Année 2',
    year3: 'Année 3',
    year4: 'Année 4',
    year5: 'Année 5',
    planCurrency: '',
    planCurrencySymbol: '',
  };

  const wordsES = {
    finance: 'Finanzas',
    initialInvestment: 'Inversión Inicial',
    investmentItem: 'Artículo de Inversión',
    cost: 'Costo',
    total: 'Total',
    firstYearIncomeStatement: 'Estado de Resultados del Primer Año',
    firstYearIncomeStatementJanJun: 'Estado de Resultados de Enero a Junio',
    jan: 'Ene',
    feb: 'Feb',
    mar: 'Mar',
    apr: 'Abr',
    may: 'May',
    jun: 'Jun',
    jul: 'Jul',
    aug: 'Ago',
    sep: 'Sep',
    oct: 'Oct',
    nov: 'Nov',
    dec: 'Dic',
    firstYear: 'Primer Año',
    revenue: 'Ingresos',
    cogs: 'Costo de Bienes Vendidos',
    grossMargin: 'Margen Bruto',
    operatingExpenses: 'Gastos Operativos',
    wagesAndBenefits: 'Salarios y Beneficios',
    marketing: 'Marketing',
    rent: 'Alquiler',
    generalAdministrative: 'Administrativo General',
    depreciation: 'Depreciación',
    utilities: 'Servicios Públicos',
    otherExpenses: 'Otros Gastos',
    totalExpenses: 'Gastos Totales',
    earningsBeforeInterestTaxes: 'Ganancias Antes de Intereses e Impuestos',
    interestExpense: 'Gastos de Interés',
    earningsBeforeTaxes: 'Ganancias Antes de Impuestos',
    incomeTaxes: 'Impuestos sobre la Renta',
    netIncome: 'Ingresos Netos',
    firstYearIncomeStatementJulDec: 'Estado de Resultados de Julio a Diciembre',
    year1_5IncomeStatement: 'Estado de Resultados de 1 a 5 Años',
    year1: 'Año 1',
    year2: 'Año 2',
    year3: 'Año 3',
    year4: 'Año 4',
    year5: 'Año 5',
    planCurrency: '',
    planCurrencySymbol: '',
  };

  const wordsIT = {
    finance: 'Finanza',
    initialInvestment: 'Investimento Iniziale',
    investmentItem: 'Articolo di Investimento',
    cost: 'Costo',
    total: 'Totale',
    firstYearIncomeStatement: 'Bilancio del Primo Anno',
    firstYearIncomeStatementJanJun: 'Bilancio da Gennaio a Giugno',
    jan: 'Gen',
    feb: 'Feb',
    mar: 'Mar',
    apr: 'Apr',
    may: 'Mag',
    jun: 'Giu',
    jul: 'Lug',
    aug: 'Ago',
    sep: 'Set',
    oct: 'Ott',
    nov: 'Nov',
    dec: 'Dic',
    firstYear: 'Primo Anno',
    revenue: 'Entrate',
    cogs: 'Costo dei Beni Venduti',
    grossMargin: 'Margine Lordo',
    operatingExpenses: 'Spese Operative',
    wagesAndBenefits: 'Salari e Benefici',
    marketing: 'Marketing',
    rent: 'Affitto',
    generalAdministrative: 'Amministrativo Generale',
    depreciation: 'Ammortamento',
    utilities: 'Servizi',
    otherExpenses: 'Altre Spese',
    totalExpenses: 'Spese Totali',
    earningsBeforeInterestTaxes: 'Utili Prima degli Interessi e delle Tasse',
    interestExpense: 'Spese per Interessi',
    earningsBeforeTaxes: 'Utili Prima delle Tasse',
    incomeTaxes: 'Imposte sul Reddito',
    netIncome: 'Reddito Netto',
    firstYearIncomeStatementJulDec: 'Bilancio da Luglio a Dicembre',
    year1_5IncomeStatement: 'Bilancio da 1 a 5 Anni',
    year1: 'Anno 1',
    year2: 'Anno 2',
    year3: 'Anno 3',
    year4: 'Anno 4',
    year5: 'Anno 5',
    planCurrency: '',
    planCurrencySymbol: '',
  };

  const wordsNL = {
    finance: 'Financiën',
    initialInvestment: 'Initiële Investering',
    investmentItem: 'Investering Item',
    cost: 'Kosten',
    total: 'Totaal',
    firstYearIncomeStatement: 'Inkomstenverklaring Eerste Jaar',
    firstYearIncomeStatementJanJun: 'Inkomstenverklaring Jan - Jun',
    jan: 'Jan',
    feb: 'Feb',
    mar: 'Mrt',
    apr: 'Apr',
    may: 'Mei',
    jun: 'Jun',
    jul: 'Jul',
    aug: 'Aug',
    sep: 'Sep',
    oct: 'Okt',
    nov: 'Nov',
    dec: 'Dec',
    firstYear: 'Eerste Jaar',
    revenue: 'Inkomsten',
    cogs: 'Kosten van Verkochte Goederen',
    grossMargin: 'Bruto Marge',
    operatingExpenses: 'Operationele Kosten',
    wagesAndBenefits: 'Lonen en Voordelen',
    marketing: 'Marketing',
    rent: 'Huur',
    generalAdministrative: 'Algemene Administratie',
    depreciation: 'Afschrijving',
    utilities: 'Nutsvoorzieningen',
    otherExpenses: 'Andere Uitgaven',
    totalExpenses: 'Totale Uitgaven',
    earningsBeforeInterestTaxes: 'Winst voor Rente en Belastingen',
    interestExpense: 'Rente Uitgaven',
    earningsBeforeTaxes: 'Winst voor Belastingen',
    incomeTaxes: 'Inkomstenbelasting',
    netIncome: 'Netto Inkomen',
    firstYearIncomeStatementJulDec: 'Inkomstenverklaring Jul - Dec',
    year1_5IncomeStatement: 'Inkomstenverklaring Jaar 1 - 5',
    year1: 'Jaar 1',
    year2: 'Jaar 2',
    year3: 'Jaar 3',
    year4: 'Jaar 4',
    year5: 'Jaar 5',
    planCurrency: '',
    planCurrencySymbol: '',
  };

  const wordsJA = {
    finance: 'ファイナンス',
    initialInvestment: '初期投資',
    investmentItem: '投資項目',
    cost: 'コスト',
    total: '合計',
    firstYearIncomeStatement: '初年度の損益計算書',
    firstYearIncomeStatementJanJun: '初年度の損益計算書 1月 - 6月',
    jan: '1月',
    feb: '2月',
    mar: '3月',
    apr: '4月',
    may: '5月',
    jun: '6月',
    jul: '7月',
    aug: '8月',
    sep: '9月',
    oct: '10月',
    nov: '11月',
    dec: '12月',
    firstYear: '初年度',
    revenue: '収益',
    cogs: '売上原価',
    grossMargin: '粗利益',
    operatingExpenses: '営業費用',
    wagesAndBenefits: '賃金と福利厚生',
    marketing: 'マーケティング',
    rent: '家賃',
    generalAdministrative: '一般管理費',
    depreciation: '減価償却費',
    utilities: '公共料金',
    otherExpenses: 'その他の経費',
    totalExpenses: '総経費',
    earningsBeforeInterestTaxes: '利子税引前利益',
    interestExpense: '利息費用',
    earningsBeforeTaxes: '税引前利益',
    incomeTaxes: '所得税',
    netIncome: '純利益',
    firstYearIncomeStatementJulDec: '初年度の損益計算書 7月 - 12月',
    year1_5IncomeStatement: '損益計算書 年1 - 5',
    year1: '年1',
    year2: '年2',
    year3: '年3',
    year4: '年4',
    year5: '年5',
    planCurrency: '',
    planCurrencySymbol: '',
  };

  const wordsAR = {
    finance: 'المالية',
    initialInvestment: 'الاستثمار الأولي',
    investmentItem: 'بند الاستثمار',
    cost: 'التكلفة',
    total: 'المجموع',
    firstYearIncomeStatement: 'بيان الدخل للسنة الأولى',
    firstYearIncomeStatementJanJun: 'بيان الدخل للسنة الأولى يناير - يونيو',
    jan: 'يناير',
    feb: 'فبراير',
    mar: 'مارس',
    apr: 'أبريل',
    may: 'مايو',
    jun: 'يونيو',
    jul: 'يوليو',
    aug: 'أغسطس',
    sep: 'سبتمبر',
    oct: 'أكتوبر',
    nov: 'نوفمبر',
    dec: 'ديسمبر',
    firstYear: 'السنة الأولى',
    revenue: 'الإيرادات',
    cogs: 'تكلفة البضاعة المباعة',
    grossMargin: 'الهامش الإجمالي',
    operatingExpenses: 'النفقات التشغيلية',
    wagesAndBenefits: 'الأجور والمزايا',
    marketing: 'التسويق',
    rent: 'الإيجار',
    generalAdministrative: 'الإدارة العامة',
    depreciation: 'الاستهلاك',
    utilities: 'المرافق',
    otherExpenses: 'النفقات الأخرى',
    totalExpenses: 'إجمالي النفقات',
    earningsBeforeInterestTaxes: 'الأرباح قبل الفوائد والضرائب',
    interestExpense: 'تكلفة الفائدة',
    earningsBeforeTaxes: 'الأرباح قبل الضرائب',
    incomeTaxes: 'ضرائب الدخل',
    netIncome: 'صافي الدخل',
    firstYearIncomeStatementJulDec: 'بيان الدخل للسنة الأولى يوليو - ديسمبر',
    year1_5IncomeStatement: 'بيان الدخل السنة 1 - 5',
    year1: 'السنة 1',
    year2: 'السنة 2',
    year3: 'السنة 3',
    year4: 'السنة 4',
    year5: 'السنة 5',
    planCurrency: '',
    planCurrencySymbol: '',
  };

  const wordsSV = {
    finance: 'Finans',
    initialInvestment: 'Initial investering',
    investmentItem: 'Investeringsobjekt',
    cost: 'Kostnad',
    total: 'Totalt',
    firstYearIncomeStatement: 'Resultaträkning första året',
    firstYearIncomeStatementJanJun: 'Resultaträkning första året Jan - Jun',
    jan: 'Jan',
    feb: 'Feb',
    mar: 'Mar',
    apr: 'Apr',
    may: 'Maj',
    jun: 'Jun',
    jul: 'Jul',
    aug: 'Aug',
    sep: 'Sep',
    oct: 'Okt',
    nov: 'Nov',
    dec: 'Dec',
    firstYear: 'Första året',
    revenue: 'Intäkter',
    cogs: 'Varukostnad',
    grossMargin: 'Bruttomarginal',
    operatingExpenses: 'Rörelsekostnader',
    wagesAndBenefits: 'Löner och förmåner',
    marketing: 'Marknadsföring',
    rent: 'Hyra',
    generalAdministrative: 'Allmänna administrativa',
    depreciation: 'Avskrivningar',
    utilities: 'Verktyg',
    otherExpenses: 'Andra utgifter',
    totalExpenses: 'Totala utgifter',
    earningsBeforeInterestTaxes: 'Resultat före räntor och skatter',
    interestExpense: 'Räntekostnad',
    earningsBeforeTaxes: 'Resultat före skatt',
    incomeTaxes: 'Inkomstskatter',
    netIncome: 'Nettoinkomst',
    firstYearIncomeStatementJulDec: 'Resultaträkning första året Jul - Dec',
    year1_5IncomeStatement: 'Resultaträkning år 1 - 5',
    year1: 'År 1',
    year2: 'År 2',
    year3: 'År 3',
    year4: 'År 4',
    year5: 'År 5',
    planCurrency: '',
    planCurrencySymbol: '',
  };

  const wordsFI = {
    finance: 'Rahoitus',
    initialInvestment: 'Alkuperäinen investointi',
    investmentItem: 'Investointikohde',
    cost: 'Kustannus',
    total: 'Yhteensä',
    firstYearIncomeStatement: 'Tuloslaskelma ensimmäinen vuosi',
    firstYearIncomeStatementJanJun:
      'Tuloslaskelma ensimmäinen vuosi tammi - kesä',
    jan: 'Tammi',
    feb: 'Helmi',
    mar: 'Maalis',
    apr: 'Huhti',
    may: 'Touko',
    jun: 'Kesä',
    jul: 'Heinä',
    aug: 'Elo',
    sep: 'Syys',
    oct: 'Loka',
    nov: 'Marras',
    dec: 'Joulu',
    firstYear: 'Ensimmäinen vuosi',
    revenue: 'Tulot',
    cogs: 'Hyödykkeiden kustannus',
    grossMargin: 'Bruttokate',
    operatingExpenses: 'Käyttökulut',
    wagesAndBenefits: 'Palkat ja edut',
    marketing: 'Markkinointi',
    rent: 'Vuokra',
    generalAdministrative: 'Yleinen hallinto',
    depreciation: 'Poistot',
    utilities: 'Hyödykkeet',
    otherExpenses: 'Muut kulut',
    totalExpenses: 'Kulut yhteensä',
    earningsBeforeInterestTaxes: 'Tulot ennen korkoja ja veroja',
    interestExpense: 'Korkokulut',
    earningsBeforeTaxes: 'Tulot ennen veroja',
    incomeTaxes: 'Tuloverot',
    netIncome: 'Nettotulot',
    firstYearIncomeStatementJulDec:
      'Tuloslaskelma ensimmäinen vuosi heinä - joulu ',
    year1_5IncomeStatement: 'Tuloslaskelma vuodet 1 - 5',
    year1: 'Vuosi 1',
    year2: 'Vuosi 2',
    year3: 'Vuosi 3',
    year4: 'Vuosi 4',
    year5: 'Vuosi 5',
    planCurrency: '',
    planCurrencySymbol: '',
  };

  const wordsDA = {
    finance: 'Finans',
    initialInvestment: 'Indledende investering',
    investmentItem: 'Investeringsvare',
    cost: 'Omkostninger',
    total: 'Total',
    firstYearIncomeStatement: 'Resultatopgørelse første år',
    firstYearIncomeStatementJanJun: 'Resultatopgørelse første år Jan - Jun',
    jan: 'Jan',
    feb: 'Feb',
    mar: 'Mar',
    apr: 'Apr',
    may: 'Maj',
    jun: 'Jun',
    jul: 'Jul',
    aug: 'Aug',
    sep: 'Sep',
    oct: 'Okt',
    nov: 'Nov',
    dec: 'Dec',
    firstYear: 'Første år',
    revenue: 'Indtægter',
    cogs: 'Vareforbrug',
    grossMargin: 'Bruttofortjeneste',
    operatingExpenses: 'Driftsomkostninger',
    wagesAndBenefits: 'Lønninger og fordele',
    marketing: 'Marketing',
    rent: 'Leje',
    generalAdministrative: 'Generel administrativ',
    depreciation: 'Afskrivninger',
    utilities: 'Forsyninger',
    otherExpenses: 'Andre udgifter',
    totalExpenses: 'Samlede udgifter',
    earningsBeforeInterestTaxes: 'Resultat før renter og skatter',
    interestExpense: 'Renteudgifter',
    earningsBeforeTaxes: 'Resultat før skat',
    incomeTaxes: 'Indkomstskatter',
    netIncome: 'Nettoindkomst',
    firstYearIncomeStatementJulDec: 'Resultatopgørelse første år Jul - Dec ',
    year1_5IncomeStatement: 'Resultatopgørelse år 1 - 5',
    year1: 'År 1',
    year2: 'År 2',
    year3: 'År 3',
    year4: 'År 4',
    year5: 'År 5',
    planCurrency: '',
    planCurrencySymbol: '',
  };

  const wordsNO = {
    finance: 'Finans',
    initialInvestment: 'Oppstartsinvestering',
    investmentItem: 'Investeringsvare',
    cost: 'Kostnad',
    total: 'Totalt',
    firstYearIncomeStatement: 'Resultatregnskap første år',
    firstYearIncomeStatementJanJun: 'Resultatregnskap første år Jan - Jun',
    jan: 'Jan',
    feb: 'Feb',
    mar: 'Mar',
    apr: 'Apr',
    may: 'Mai',
    jun: 'Jun',
    jul: 'Jul',
    aug: 'Aug',
    sep: 'Sep',
    oct: 'Okt',
    nov: 'Nov',
    dec: 'Des',
    firstYear: 'Første år',
    revenue: 'Inntekt',
    cogs: 'Varekostnad',
    grossMargin: 'Bruttofortjeneste',
    operatingExpenses: 'Driftskostnader',
    wagesAndBenefits: 'Lønninger og fordeler',
    marketing: 'Markedsføring',
    rent: 'Leie',
    generalAdministrative: 'Generell administrasjon',
    depreciation: 'Avskrivninger',
    utilities: 'Forsyninger',
    otherExpenses: 'Andre utgifter',
    totalExpenses: 'Totale utgifter',
    earningsBeforeInterestTaxes: 'Resultat før renter og skatter',
    interestExpense: 'Renteutgifter',
    earningsBeforeTaxes: 'Resultat før skatt',
    incomeTaxes: 'Inntektsskatt',
    netIncome: 'Nettoinntekt',
    firstYearIncomeStatementJulDec: 'Resultatregnskap første år Jul - Des ',
    year1_5IncomeStatement: 'Resultatregnskap år 1 - 5',
    year1: 'År 1',
    year2: 'År 2',
    year3: 'År 3',
    year4: 'År 4',
    year5: 'År 5',
    planCurrency: '',
    planCurrencySymbol: '',
  };

  const words = {
    'en-uk': wordsEN,
    en: wordsEN,
    de: wordsDE,
    fr: wordsFR,
    es: wordsES,
    it: wordsIT,
    nl: wordsNL,
    ja: wordsJA,
    ar: wordsAR,
    sv: wordsSV,
    fi: wordsFI,
    da: wordsDA,
    no: wordsNO,
  };

  return <>{financeFunction(words[planLanguage] || wordsEN)}</>;

  function financeFunction(words) {
    return (
      <>
        <h4>{words.finance}</h4>

        {investmentItem1 && investmentAmountItem1 ? (
          <>
            <h5>
              {words.initialInvestment} ({planCurrencySymbol} {planCurrency})
            </h5>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table
                style={tableStyle}
                className="w-full text-base text-left text-gray-500 dark:text-gray-400"
              >
                <thead
                  style={boldCellStyle}
                  className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                  <tr>
                    <th style={boldCellStyle} scope="col" className="px-6 py-2">
                      {words.investmentItem}
                    </th>
                    <th style={boldCellStyle} scope="col" className="px-6 py-2">
                      {words.cost}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem1}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem1?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem2}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem2?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem3}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem3?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem4}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem4?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem5}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem5?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem6}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem6?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem7}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem7?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem8}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem8?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem9}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem9?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem10}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem10?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b font-bold bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={boldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {words.total}
                    </th>
                    <td style={boldCellStyle} className="px-6 py-1">
                      {initialInvestmentAmount?.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
          </>
        ) : (
          <></>
        )}

        <h5>
          {words.firstYearIncomeStatement} ({planCurrencySymbol} {planCurrency})
        </h5>
        <h6>
          {words.firstYearIncomeStatement} {words.jan} - {words.jun} (
          {planCurrencySymbol} {planCurrency})
        </h6>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.jan}
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.feb}
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.mar}
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.apr}
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.may}
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.jun}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.revenue}
                </th>
                {revenue1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.cogs}
                </th>
                {COGS1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.grossMargin}
                </th>
                {grossMargin1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.operatingExpenses}
                </th>
                {Array.from({ length: 6 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  {words.wagesAndBenefits}
                </th>
                {wageCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.marketing}
                </th>
                {markCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.rent}
                </th>
                {rentCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.generalAdministrative}
                </th>
                {genCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.depreciation}
                </th>
                {depreCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.utilities}
                </th>
                {utilCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.otherExpenses}
                </th>
                {otherCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.totalExpenses}
                </th>
                {totalExpense1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.earningsBeforeInterestTaxes}
                </th>
                {EBIT1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.interestExpense}
                </th>
                {intCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.earningsBeforeTaxes}
                </th>
                {EBT1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.incomeTaxes}
                </th>
                {taxCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.netIncome}
                </th>
                {netIncome1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <br />

        <h6>
          {words.firstYearIncomeStatement} {words.jul} - {words.dec} (
          {planCurrencySymbol} {planCurrency})
        </h6>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.jul}
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.aug}
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.sep}
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.oct}
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.nov}
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.dec}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.revenue}
                </th>
                {revenue2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.cogs}
                </th>
                {COGS2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.grossMargin}
                </th>
                {grossMargin2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.operatingExpenses}
                </th>
                {Array.from({ length: 6 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  {words.wagesAndBenefits}
                </th>
                {wageCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.marketing}
                </th>
                {markCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.rent}
                </th>
                {rentCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.generalAdministrative}
                </th>
                {genCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.depreciation}
                </th>
                {depreCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.utilities}
                </th>
                {utilCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.otherExpenses}
                </th>
                {otherCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.totalExpenses}
                </th>
                {totalExpense2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.earningsBeforeInterestTaxes}
                </th>
                {EBIT2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.interestExpense}
                </th>
                {intCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.earningsBeforeTaxes}
                </th>
                {EBT2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.incomeTaxes}
                </th>
                {taxCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.netIncome}
                </th>
                {netIncome2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <h5>
          {words.year1_5IncomeStatement} ({planCurrencySymbol} {planCurrency})
        </h5>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.year1}
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.year2}
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.year3}
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.year4}
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.year5}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.revenue}
                </th>
                {revenueYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {(+item)?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.cogs}
                </th>
                {COGSYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.grossMargin}
                </th>
                {grossMarginYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.operatingExpenses}
                </th>
                {Array.from({ length: 5 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  {words.wagesAndBenefits}
                </th>
                {wageCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.marketing}
                </th>
                {markCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.rent}
                </th>
                {rentCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.generalAdministrative}
                </th>
                {genCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.depreciation}
                </th>
                {depreCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.utilities}
                </th>
                {utilCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.otherExpenses}
                </th>
                {otherCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.totalExpenses}
                </th>
                {totalExpenseYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.earningsBeforeInterestTaxes}
                </th>
                {EBITYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.interestExpense}
                </th>
                {intCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.earningsBeforeTaxes}
                </th>
                {EBTYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.incomeTaxes}
                </th>
                {taxCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.netIncome}
                </th>
                {netIncomeYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }

  function germanFinance() {
    return (
      <>
        <h4>Finanzen</h4>

        {investmentItem1 && investmentAmountItem1 ? (
          <>
            <h5>
              Erstinvestition({planCurrencySymbol} {planCurrency})
            </h5>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table
                style={tableStyle}
                className="w-full text-base text-left text-gray-500 dark:text-gray-400"
              >
                <thead
                  style={boldCellStyle}
                  className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                  <tr>
                    <th style={boldCellStyle} scope="col" className="px-6 py-2">
                      Investitionsgut
                    </th>
                    <th style={boldCellStyle} scope="col" className="px-6 py-2">
                      Kosten
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem1}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem1?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem2}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem2?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem3}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem3?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem4}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem4?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem5}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem5?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem6}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem6?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem7}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem7?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem8}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem8?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem9}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem9?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem10}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem10?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b font-bold bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={boldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Insgesamt
                    </th>
                    <td style={boldCellStyle} className="px-6 py-1">
                      {initialInvestmentAmount?.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
          </>
        ) : (
          <></>
        )}

        <h5>
          Einkommenserklärung für das erste Jahr({planCurrencySymbol}{' '}
          {planCurrency})
        </h5>
        <h6>
          Gewinn- und Verlustrechnung für das erste Jahr Jan - Juni (
          {planCurrencySymbol} {planCurrency})
        </h6>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Jan
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Feb
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  März
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Apr
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Mai
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Juni
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Einnahmen
                </th>
                {revenue1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Kosten der verkauften Waren
                </th>
                {COGS1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Bruttomarge
                </th>
                {grossMargin1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Betriebliche Aufwendungen
                </th>
                {Array.from({ length: 6 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  Löhne und Sozialleistungen
                </th>
                {wageCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  marketing
                </th>
                {markCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Miete
                </th>
                {rentCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Allgemeines und Verwaltung
                </th>
                {genCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Abschreibung
                </th>
                {depreCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Versorgungsunternehmen
                </th>
                {utilCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Sonstige Ausgaben
                </th>
                {otherCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Gesamtausgaben
                </th>
                {totalExpense1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ergebnis vor Zinsen und Steuern
                </th>
                {EBIT1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Zinsaufwand
                </th>
                {intCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ergebnis vor Steuern
                </th>
                {EBT1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Einkommensteuer
                </th>
                {taxCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Reingewinn
                </th>
                {netIncome1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <br />

        <h6>
          Gewinn- und Verlustrechnung des ersten Jahres Juli - Dez (
          {planCurrencySymbol} {planCurrency})
        </h6>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Juli
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Aug
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Sept
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Okt
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Nov
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Dez
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Einnahmen
                </th>
                {revenue2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Kosten der verkauften Waren
                </th>
                {COGS2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Bruttomarge
                </th>
                {grossMargin2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Betriebliche Aufwendungen
                </th>
                {Array.from({ length: 6 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  Löhne und Sozialleistungen
                </th>
                {wageCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Marketing
                </th>
                {markCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Miete
                </th>
                {rentCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Allgemeines und Verwaltung
                </th>
                {genCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Abschreibung
                </th>
                {depreCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Versorgungsunternehmen
                </th>
                {utilCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Sonstige Ausgaben
                </th>
                {otherCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Gesamtausgaben
                </th>
                {totalExpense2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ergebnis vor Zinsen und Steuern
                </th>
                {EBIT2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Zinsaufwand
                </th>
                {intCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ergebnis vor Steuern
                </th>
                {EBT2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Einkommensteuer
                </th>
                {taxCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Reingewinn
                </th>
                {netIncome2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <h5>
          Jahr 1 - 5 Gewinn- und Verlustrechnung({planCurrencySymbol}{' '}
          {planCurrency})
        </h5>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Jahr 1
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Jahr 2
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Jahr 3
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Jahr 4
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Jahr 5
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Einnahmen
                </th>
                {revenueYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {(+item)?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Kosten der verkauften Waren
                </th>
                {COGSYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Bruttomarge
                </th>
                {grossMarginYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Betriebliche Aufwendungen
                </th>
                {Array.from({ length: 5 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  Löhne und Sozialleistungen
                </th>
                {wageCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Marketing
                </th>
                {markCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Miete
                </th>
                {rentCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Allgemeines und Verwaltung
                </th>
                {genCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Abschreibung
                </th>
                {depreCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Versorgungsunternehmen
                </th>
                {utilCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Sonstige Ausgaben
                </th>
                {otherCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Gesamtausgaben
                </th>
                {totalExpenseYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ergebnis vor Zinsen und Steuern
                </th>
                {EBITYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Zinsaufwand
                </th>
                {intCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ergebnis vor Steuern
                </th>
                {EBTYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Einkommensteuer
                </th>
                {taxCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Reingewinn
                </th>
                {netIncomeYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }

  function frenchFinance() {
    return (
      <>
        <h4>Finances</h4>

        {investmentItem1 && investmentAmountItem1 ? (
          <>
            <h5>
              Investissement initial({planCurrencySymbol} {planCurrency})
            </h5>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table
                style={tableStyle}
                className="w-full text-base text-left text-gray-500 dark:text-gray-400"
              >
                <thead
                  style={boldCellStyle}
                  className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                  <tr>
                    <th style={boldCellStyle} scope="col" className="px-6 py-2">
                      Article d'investissement
                    </th>
                    <th style={boldCellStyle} scope="col" className="px-6 py-2">
                      Coût
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem1}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem1?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem2}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem2?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem3}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem3?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem4}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem4?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem5}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem5?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem6}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem6?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem7}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem7?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem8}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem8?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem9}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem9?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem10}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem10?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b font-bold bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={boldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Total
                    </th>
                    <td style={boldCellStyle} className="px-6 py-1">
                      {initialInvestmentAmount?.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
          </>
        ) : (
          <></>
        )}

        <h5>
          Compte de résultat de la première année({planCurrencySymbol}{' '}
          {planCurrency})
        </h5>
        <h6>
          Compte de résultat de la première année Jan - Juin (
          {planCurrencySymbol} {planCurrency})
        </h6>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Jan
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Fév
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Mar
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Avr
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Mai
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Juin
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Revenu
                </th>
                {revenue1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Coût des biens vendus
                </th>
                {COGS1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Marge brute
                </th>
                {grossMargin1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Frais d'exploitation
                </th>
                {Array.from({ length: 6 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  Salaires et avantages
                </th>
                {wageCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Marketing
                </th>
                {markCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Loyer
                </th>
                {rentCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Général & Administratif
                </th>
                {genCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Amortissement
                </th>
                {depreCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Services publics
                </th>
                {utilCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Autres dépenses
                </th>
                {otherCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Total des dépenses
                </th>
                {totalExpense1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Bénéfice avant intérêts et impôts
                </th>
                {EBIT1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Frais d'intérêt
                </th>
                {intCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Bénéfice avant impôts
                </th>
                {EBT1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Impôts sur le revenu
                </th>
                {taxCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Revenu net
                </th>
                {netIncome1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <br />

        <h6>
          Compte de résultat de la première année juil - Déc (
          {planCurrencySymbol} {planCurrency})
        </h6>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Juil
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Août
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Sep
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Oct
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Nov
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Déc
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Revenu
                </th>
                {revenue2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Coût des biens vendus
                </th>
                {COGS2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Marge brute
                </th>
                {grossMargin2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Frais d'exploitation
                </th>
                {Array.from({ length: 6 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  Salaires et avantages
                </th>
                {wageCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Marketing
                </th>
                {markCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Loyer
                </th>
                {rentCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Général & Administratif
                </th>
                {genCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Amortissement
                </th>
                {depreCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Services publics
                </th>
                {utilCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Autres dépenses
                </th>
                {otherCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Total des dépenses
                </th>
                {totalExpense2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Bénéfice avant intérêts et impôts
                </th>
                {EBIT2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Frais d'intérêt
                </th>
                {intCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Bénéfice avant impôts
                </th>
                {EBT2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Impôts sur le revenu
                </th>
                {taxCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Revenu net
                </th>
                {netIncome2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <h5>
          Année 1 - 5 Compte de résultat({planCurrencySymbol} {planCurrency})
        </h5>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Année 1
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Année 2
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Année 3
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Année 4
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Année 5
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Revenu
                </th>
                {revenueYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {(+item)?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Coût des biens vendus
                </th>
                {COGSYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Marge brute
                </th>
                {grossMarginYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Frais d'exploitation
                </th>
                {Array.from({ length: 5 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  Salaires et avantages
                </th>
                {wageCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Marketing
                </th>
                {markCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Loyer
                </th>
                {rentCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Général & Administratif
                </th>
                {genCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Amortissement
                </th>
                {depreCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Services publics
                </th>
                {utilCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Autres dépenses
                </th>
                {otherCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Total des dépenses
                </th>
                {totalExpenseYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Bénéfice avant intérêts et impôts
                </th>
                {EBITYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Frais d'intérêt
                </th>
                {intCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Bénéfice avant impôts
                </th>
                {EBTYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Impôts sur le revenu
                </th>
                {taxCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Revenu net
                </th>
                {netIncomeYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }

  function spanishFinance() {
    return (
      <>
        <h4>Finanzas</h4>

        {investmentItem1 && investmentAmountItem1 ? (
          <>
            <h5>
              InversióInversión inicialn inicial({planCurrencySymbol}{' '}
              {planCurrency})
            </h5>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table
                style={tableStyle}
                className="w-full text-base text-left text-gray-500 dark:text-gray-400"
              >
                <thead
                  style={boldCellStyle}
                  className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                  <tr>
                    <th style={boldCellStyle} scope="col" className="px-6 py-2">
                      Artículo de inversión
                    </th>
                    <th style={boldCellStyle} scope="col" className="px-6 py-2">
                      Coste
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem1}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem1?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem2}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem2?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem3}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem3?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem4}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem4?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem5}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem5?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem6}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem6?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem7}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem7?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem8}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem8?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem9}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem9?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem10}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem10?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b font-bold bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={boldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Total
                    </th>
                    <td style={boldCellStyle} className="px-6 py-1">
                      {initialInvestmentAmount?.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
          </>
        ) : (
          <></>
        )}

        <h5>
          Primer año Income Statement({planCurrencySymbol} {planCurrency})
        </h5>
        <h6>
          Primer año Income Statement Ene - Jun ({planCurrencySymbol}{' '}
          {planCurrency})
        </h6>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Ene
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Feb
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Mar
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Abr
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  May
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Jun
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ingresos
                </th>
                {revenue1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Coste de los bienes vendidos
                </th>
                {COGS1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Margen bruto
                </th>
                {grossMargin1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Gastos operativos
                </th>
                {Array.from({ length: 6 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  Salarios y beneficios
                </th>
                {wageCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Marketing
                </th>
                {markCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Alquiler
                </th>
                {rentCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  General y administrativo
                </th>
                {genCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Depreciación
                </th>
                {depreCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Utilidades
                </th>
                {utilCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Autres dépenses
                </th>
                {otherCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Gastos totales
                </th>
                {totalExpense1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ganancias antes de intereses e impuestos
                </th>
                {EBIT1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Gasto de interés
                </th>
                {intCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ganancias antes de impuestos
                </th>
                {EBT1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Impuestos sobre la renta
                </th>
                {taxCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ingresos netos
                </th>
                {netIncome1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <br />

        <h6>
          Primer año Income Statement Jul - Dic ({planCurrencySymbol}{' '}
          {planCurrency})
        </h6>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Jul
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Ago
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Sep
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Oct
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Nov
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Dic
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ingresos
                </th>
                {revenue2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Coste de los bienes vendidos
                </th>
                {COGS2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Margen bruto
                </th>
                {grossMargin2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Gastos operativos
                </th>
                {Array.from({ length: 6 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  Salarios y beneficios
                </th>
                {wageCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Marketing
                </th>
                {markCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Alquiler
                </th>
                {rentCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  General y administrativo
                </th>
                {genCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Depreciación
                </th>
                {depreCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Utilidades
                </th>
                {utilCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Autres dépenses
                </th>
                {otherCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Gastos totales
                </th>
                {totalExpense2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ganancias antes de intereses e impuestos
                </th>
                {EBIT2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Gasto de interés
                </th>
                {intCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ganancias antes de impuestos
                </th>
                {EBT2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Impuestos sobre la renta
                </th>
                {taxCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ingresos netos
                </th>
                {netIncome2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <h5>
          Año 1 - 5 Income Statement({planCurrencySymbol} {planCurrency})
        </h5>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Año 1
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Año 2
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Año 3
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Año 4
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Año 5
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ingresos
                </th>
                {revenueYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {(+item)?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Coste de los bienes vendidos
                </th>
                {COGSYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Margen bruto
                </th>
                {grossMarginYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Gastos operativos
                </th>
                {Array.from({ length: 5 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  Salarios y beneficios
                </th>
                {wageCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Marketing
                </th>
                {markCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Alquiler
                </th>
                {rentCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  General y administrativo
                </th>
                {genCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Depreciación
                </th>
                {depreCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Utilidades
                </th>
                {utilCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Autres dépenses
                </th>
                {otherCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Gastos totales
                </th>
                {totalExpenseYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ganancias antes de intereses e impuestos
                </th>
                {EBITYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Gasto de interés
                </th>
                {intCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ganancias antes de impuestos
                </th>
                {EBTYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Impuestos sobre la renta
                </th>
                {taxCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ingresos netos
                </th>
                {netIncomeYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }

  function italianFinance() {
    return (
      <>
        <h4>Finanza</h4>

        {investmentItem1 && investmentAmountItem1 ? (
          <>
            <h5>
              Investimento iniziale({planCurrencySymbol} {planCurrency})
            </h5>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table
                style={tableStyle}
                className="w-full text-base text-left text-gray-500 dark:text-gray-400"
              >
                <thead
                  style={boldCellStyle}
                  className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                  <tr>
                    <th style={boldCellStyle} scope="col" className="px-6 py-2">
                      Articolo di investimento
                    </th>
                    <th style={boldCellStyle} scope="col" className="px-6 py-2">
                      Costo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem1}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem1?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem2}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem2?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem3}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem3?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem4}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem4?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem5}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem5?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem6}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem6?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem7}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem7?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem8}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem8?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem9}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem9?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem10}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem10?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b font-bold bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={boldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Totale
                    </th>
                    <td style={boldCellStyle} className="px-6 py-1">
                      {initialInvestmentAmount?.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
          </>
        ) : (
          <></>
        )}

        <h5>
          Primo anno Income Statement({planCurrencySymbol} {planCurrency})
        </h5>
        <h6>
          Primo anno Income Statement Gen - Giu ({planCurrencySymbol}{' '}
          {planCurrency})
        </h6>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Gen
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Feb
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Mar
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Apr
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Mag
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Giu
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Entrate
                </th>
                {revenue1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Costo del venduto
                </th>
                {COGS1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Margine lordo
                </th>
                {grossMargin1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Spese operative
                </th>
                {Array.from({ length: 6 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  Salari e benefici
                </th>
                {wageCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Marketing
                </th>
                {markCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Affitto
                </th>
                {rentCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Generale & Amministrativo
                </th>
                {genCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ammortamento
                </th>
                {depreCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Servizi
                </th>
                {utilCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Autres dépenses
                </th>
                {otherCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Spese totali
                </th>
                {totalExpense1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Utili prima degli interessi e delle tasse
                </th>
                {EBIT1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Spese per interessi
                </th>
                {intCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Utili prima delle tasse
                </th>
                {EBT1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Imposte sul reddito
                </th>
                {taxCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Reddito netto
                </th>
                {netIncome1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <br />

        <h6>
          Primo anno Income Statement Lug - Dic ({planCurrencySymbol}{' '}
          {planCurrency})
        </h6>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Lug
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Ago
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Set
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Ott
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Nov
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Dic
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Entrate
                </th>
                {revenue2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Costo del venduto
                </th>
                {COGS2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Margine lordo
                </th>
                {grossMargin2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Spese operative
                </th>
                {Array.from({ length: 6 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  Salari e benefici
                </th>
                {wageCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Marketing
                </th>
                {markCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Affitto
                </th>
                {rentCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Generale & Amministrativo
                </th>
                {genCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ammortamento
                </th>
                {depreCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Servizi
                </th>
                {utilCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Autres dépenses
                </th>
                {otherCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Spese totali
                </th>
                {totalExpense2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Utili prima degli interessi e delle tasse
                </th>
                {EBIT2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Spese per interessi
                </th>
                {intCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Utili prima delle tasse
                </th>
                {EBT2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Imposte sul reddito
                </th>
                {taxCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Reddito netto
                </th>
                {netIncome2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <h5>
          Anno 1 - 5 Income Statement({planCurrencySymbol} {planCurrency})
        </h5>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Anno 1
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Anno 2
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Anno 3
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Anno 4
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Anno 5
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Entrate
                </th>
                {revenueYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {(+item)?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Costo del venduto
                </th>
                {COGSYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Margine lordo
                </th>
                {grossMarginYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Spese operative
                </th>
                {Array.from({ length: 5 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  Salari e benefici
                </th>
                {wageCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Marketing
                </th>
                {markCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Affitto
                </th>
                {rentCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Generale & Amministrativo
                </th>
                {genCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Ammortamento
                </th>
                {depreCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Servizi
                </th>
                {utilCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Autres dépenses
                </th>
                {otherCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Spese totali
                </th>
                {totalExpenseYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Utili prima degli interessi e delle tasse
                </th>
                {EBITYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Spese per interessi
                </th>
                {intCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Utili prima delle tasse
                </th>
                {EBTYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Imposte sul reddito
                </th>
                {taxCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Reddito netto
                </th>
                {netIncomeYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }

  function dutchFinance() {
    return (
      <>
        <h4>Financiën</h4>

        {investmentItem1 && investmentAmountItem1 ? (
          <>
            <h5>
              Initiële investering({planCurrencySymbol} {planCurrency})
            </h5>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table
                style={tableStyle}
                className="w-full text-base text-left text-gray-500 dark:text-gray-400"
              >
                <thead
                  style={boldCellStyle}
                  className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                  <tr>
                    <th style={boldCellStyle} scope="col" className="px-6 py-2">
                      Investeringsitem
                    </th>
                    <th style={boldCellStyle} scope="col" className="px-6 py-2">
                      Kosten
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem1}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem1?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem2}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem2?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem3}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem3?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem4}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem4?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem5}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem5?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem6}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem6?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem7}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem7?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem8}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem8?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem9}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem9?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem10}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem10?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b font-bold bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={boldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Totaal
                    </th>
                    <td style={boldCellStyle} className="px-6 py-1">
                      {initialInvestmentAmount?.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
          </>
        ) : (
          <></>
        )}

        <h5>
          Eerste Jaar Inkomensoverzicht({planCurrencySymbol} {planCurrency})
        </h5>
        <h6>
          Eerste Jaar Inkomensoverzicht Jan - Jun ({planCurrencySymbol}{' '}
          {planCurrency})
        </h6>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Jan
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Feb
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Mrt
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Apr
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Mei
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Jun
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Omzet
                </th>
                {revenue1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Kosten van verkochte goederen
                </th>
                {COGS1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Brutomarge
                </th>
                {grossMargin1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Operationele kosten
                </th>
                {Array.from({ length: 6 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  Lonen en voordelen
                </th>
                {wageCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Marketing
                </th>
                {markCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Huur
                </th>
                {rentCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Algemene & administratieve kosten
                </th>
                {genCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Afschrijvingen
                </th>
                {depreCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Nutsvoorzieningen
                </th>
                {utilCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Andere uitgaven
                </th>
                {otherCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Totale uitgaven
                </th>
                {totalExpense1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Winst voor rente & belastingen
                </th>
                {EBIT1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Rente kosten
                </th>
                {intCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Winst voor belastingen
                </th>
                {EBT1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Inkomstenbelasting
                </th>
                {taxCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Netto inkomen
                </th>
                {netIncome1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <br />

        <h6>
          Eerste Jaar Winst- en Verliesrekening Jul - Dec ({planCurrencySymbol}{' '}
          {planCurrency})
        </h6>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Jul
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Aug
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Sep
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Okt
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Nov
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Dec
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Omzet
                </th>
                {revenue2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Kosten van verkochte goederen
                </th>
                {COGS2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Brutomarge
                </th>
                {grossMargin2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Operationele kosten
                </th>
                {Array.from({ length: 6 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  Lonen en voordelen
                </th>
                {wageCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Marketing
                </th>
                {markCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Huur
                </th>
                {rentCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Algemene & administratieve kosten
                </th>
                {genCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Afschrijvingen
                </th>
                {depreCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Nutsvoorzieningen
                </th>
                {utilCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Andere kosten
                </th>
                {otherCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Totale kosten
                </th>
                {totalExpense2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Winst voor rente & belastingen
                </th>
                {EBIT2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Rente kosten
                </th>
                {intCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Winst voor belastingen
                </th>
                {EBT2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Inkomstenbelasting
                </th>
                {taxCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Netto inkomen
                </th>
                {netIncome2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <h5>
          Jaar 1 - 5 Resultatenrekening({planCurrencySymbol} {planCurrency})
        </h5>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Jaar 1
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Jaar 2
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Jaar 3
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Jaar 4
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Jaar 5
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Omzet
                </th>
                {revenueYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {(+item)?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Kosten van verkochte goederen
                </th>
                {COGSYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Brutomarge
                </th>
                {grossMarginYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Bedrijfskosten
                </th>
                {Array.from({ length: 5 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  Lonen en voordelen
                </th>
                {wageCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Marketing
                </th>
                {markCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Huur
                </th>
                {rentCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Algemene & administratieve kosten
                </th>
                {genCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Afschrijvingen
                </th>
                {depreCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Nutsvoorzieningen
                </th>
                {utilCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Andere uitgaven
                </th>
                {otherCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Totale uitgaven
                </th>
                {totalExpenseYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Winst voor rente & belastingen
                </th>
                {EBITYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Rente kosten
                </th>
                {intCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Winst voor belastingen
                </th>
                {EBTYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Inkomstenbelasting
                </th>
                {taxCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Netto inkomen
                </th>
                {netIncomeYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }

  function japaneseFinance() {
    return (
      <>
        <h4>財務</h4>

        {investmentItem1 && investmentAmountItem1 ? (
          <>
            <h5>
              初期投資({planCurrencySymbol} {planCurrency})
            </h5>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table
                style={tableStyle}
                className="w-full text-base text-left text-gray-500 dark:text-gray-400"
              >
                <thead
                  style={boldCellStyle}
                  className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                  <tr>
                    <th style={boldCellStyle} scope="col" className="px-6 py-2">
                      投資項目
                    </th>
                    <th style={boldCellStyle} scope="col" className="px-6 py-2">
                      コスト
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem1}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem1?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem2}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem2?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem3}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem3?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem4}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem4?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem5}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem5?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem6}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem6?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem7}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem7?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem8}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem8?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem9}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem9?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem10}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem10?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b font-bold bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={boldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      合計
                    </th>
                    <td style={boldCellStyle} className="px-6 py-1">
                      {initialInvestmentAmount?.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
          </>
        ) : (
          <></>
        )}

        <h5>
          初年度 損益計算書 ({planCurrencySymbol} {planCurrency})
        </h5>
        <h6>
          初年度 損益計算書 1月 - 6月 ({planCurrencySymbol} {planCurrency})
        </h6>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  1月
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  2月
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  3月
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  4月
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  5月
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  6月
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  収益
                </th>
                {revenue1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  売上原価
                </th>
                {COGS1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  グロス・マージン
                </th>
                {grossMargin1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  営業費用
                </th>
                {Array.from({ length: 6 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  賃金と福利厚生
                </th>
                {wageCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  マーケティング
                </th>
                {markCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  家賃
                </th>
                {rentCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  一般管理費
                </th>
                {genCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  減価償却費
                </th>
                {depreCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  公共料金
                </th>
                {utilCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  その他の費用
                </th>
                {otherCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  総経費
                </th>
                {totalExpense1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  利子・税引前利益
                </th>
                {EBIT1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  利息費用
                </th>
                {intCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  税引前利益
                </th>
                {EBT1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  所得税
                </th>
                {taxCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  純利益
                </th>
                {netIncome1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <br />

        <h6>
          初年度 損益計算書 7月 - 12月 ({planCurrencySymbol} {planCurrency})
        </h6>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  7月
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  8月
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  9月
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  10月
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  11月
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  12月
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  収益
                </th>
                {revenue2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  売上原価
                </th>
                {COGS2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  粗利益
                </th>
                {grossMargin2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  営業費用
                </th>
                {Array.from({ length: 6 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  賃金と福利厚生
                </th>
                {wageCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  マーケティング
                </th>
                {markCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  家賃
                </th>
                {rentCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  一般管理費
                </th>
                {genCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  減価償却費
                </th>
                {depreCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  公共料金
                </th>
                {utilCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  その他の経費
                </th>
                {otherCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  総経費
                </th>
                {totalExpense2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  利子・税引前利益
                </th>
                {EBIT2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  利息費用
                </th>
                {intCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  税引前利益
                </th>
                {EBT2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  所得税
                </th>
                {taxCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  純利益
                </th>
                {netIncome2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <h5>
          年1 - 5 損益計算書({planCurrencySymbol} {planCurrency})
        </h5>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  年1
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  年2
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  年3
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  年4
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  年5
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  収益
                </th>
                {revenueYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {(+item)?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  売上原価
                </th>
                {COGSYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  粗利益
                </th>
                {grossMarginYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  営業費用
                </th>
                {Array.from({ length: 5 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  賃金と福利厚生
                </th>
                {wageCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  マーケティング
                </th>
                {markCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  家賃
                </th>
                {rentCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  一般管理費
                </th>
                {genCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  減価償却費
                </th>
                {depreCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  公共料金
                </th>
                {utilCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  その他の経費
                </th>
                {otherCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  総経費
                </th>
                {totalExpenseYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  利子・税引前利益
                </th>
                {EBITYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  利息費用
                </th>
                {intCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  税引前利益
                </th>
                {EBTYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  所得税
                </th>
                {taxCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  純利益
                </th>
                {netIncomeYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }

  function arabicFinance() {
    return (
      <>
        <h4>المالية</h4>

        {investmentItem1 && investmentAmountItem1 ? (
          <>
            <h5>
              الاستثمار الأولي({planCurrencySymbol} {planCurrency})
            </h5>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table
                style={tableStyle}
                className="w-full text-base text-left text-gray-500 dark:text-gray-400"
              >
                <thead
                  style={boldCellStyle}
                  className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                  <tr>
                    <th style={boldCellStyle} scope="col" className="px-6 py-2">
                      بند الاستثمار
                    </th>
                    <th style={boldCellStyle} scope="col" className="px-6 py-2">
                      التكلفة
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem1}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem1?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem2}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem2?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem3}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem3?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem4}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem4?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem5}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem5?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem6}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem6?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem7}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem7?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem8}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem8?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem9}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem9?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem10}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem10?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b font-bold bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={boldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      الإجمالي
                    </th>
                    <td style={boldCellStyle} className="px-6 py-1">
                      {initialInvestmentAmount?.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
          </>
        ) : (
          <></>
        )}

        <h5>
          السنة الأولى كشف الدخل({planCurrencySymbol} {planCurrency})
        </h5>
        <h6>
          السنة الأولى كشف الدخل يناير - يونيو ({planCurrencySymbol}{' '}
          {planCurrency})
        </h6>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  يناير
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  فبراير
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  مارس
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  أبريل
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  مايو
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  يونيو
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  الإيرادات
                </th>
                {revenue1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  تكلفة البضاعة المباعة
                </th>
                {COGS1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  الهامش الإجمالي
                </th>
                {grossMargin1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  نفقات التشغيل
                </th>
                {Array.from({ length: 6 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  الأجور والمزايا
                </th>
                {wageCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  التسويق
                </th>
                {markCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  الإيجار
                </th>
                {rentCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  العام والإداري
                </th>
                {genCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  الاستهلاك
                </th>
                {depreCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  المرافق
                </th>
                {utilCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  المصروفات الأخرى
                </th>
                {otherCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  إجمالي النفقات
                </th>
                {totalExpense1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  الأرباح قبل الفوائد والضرائب
                </th>
                {EBIT1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  نفقات الفائدة
                </th>
                {intCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  الأرباح قبل الضرائب
                </th>
                {EBT1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  ضرائب الدخل
                </th>
                {taxCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  الدخل الصافي
                </th>
                {netIncome1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <br />

        <h6>
          السنة الأولى كشف الدخل يوليو - ديسمبر ({planCurrencySymbol}{' '}
          {planCurrency})
        </h6>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  يوليو
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  أغسطس
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  سبتمبر
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  أكتوبر
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  نوفمبر
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  ديسمبر
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  الإيرادات
                </th>
                {revenue2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  تكلفة البضاعة المباعة
                </th>
                {COGS2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  تكلفة البضاعة المباعة
                </th>
                {grossMargin2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  نفقات التشغيل
                </th>
                {Array.from({ length: 6 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  الأجور والمزايا
                </th>
                {wageCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  التسويق
                </th>
                {markCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  الإيجار
                </th>
                {rentCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  العام والإداري
                </th>
                {genCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  الاستهلاك
                </th>
                {depreCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  المرافق
                </th>
                {utilCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  مصروفات أخرى
                </th>
                {otherCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  إجمالي النفقات
                </th>
                {totalExpense2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  الأرباح قبل الفوائد والضرائب
                </th>
                {EBIT2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  نفقات الفائدة
                </th>
                {intCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  الأرباح قبل الضرائب
                </th>
                {EBT2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  ضرائب الدخل
                </th>
                {taxCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  الدخل الصافي
                </th>
                {netIncome2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <h5>
          السنة 1 - 5 كشف الدخل({planCurrencySymbol} {planCurrency})
        </h5>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  السنة 1
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  السنة 2
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  السنة 3
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  السنة 4
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  السنة 5
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  الإيرادات
                </th>
                {revenueYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {(+item)?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  تكلفة البضاعة المباعة
                </th>
                {COGSYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  الهامش الإجمالي
                </th>
                {grossMarginYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  نفقات التشغيل
                </th>
                {Array.from({ length: 5 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  الأجور والمزايا
                </th>
                {wageCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  التسويق
                </th>
                {markCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  الإيجار
                </th>
                {rentCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  العام والإداري
                </th>
                {genCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  الاستهلاك
                </th>
                {depreCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  المرافق
                </th>
                {utilCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  مصروفات أخرى
                </th>
                {otherCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  إجمالي النفقات
                </th>
                {totalExpenseYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  الأرباح قبل الفوائد والضرائب
                </th>
                {EBITYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  نفقات الفائدة
                </th>
                {intCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  الأرباح قبل الضرائب
                </th>
                {EBTYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  ضرائب الدخل
                </th>
                {taxCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  الدخل الصافي
                </th>
                {netIncomeYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }

  function swedishFinance(words) {
    return (
      <>
        <h4>Finance</h4>

        {investmentItem1 && investmentAmountItem1 ? (
          <>
            <h5>
              Initial Investment({words.planCurrencySymbol} {words.planCurrency}
              )
            </h5>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table
                style={tableStyle}
                className="w-full text-base text-left text-gray-500 dark:text-gray-400"
              >
                <thead
                  style={boldCellStyle}
                  className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                >
                  <tr>
                    <th style={boldCellStyle} scope="col" className="px-6 py-2">
                      {words.investmentItem}
                    </th>
                    <th style={boldCellStyle} scope="col" className="px-6 py-2">
                      {words.cost}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem1}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem1?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem2}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem2?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem3}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem3?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem4}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem4?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem5}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem5?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem6}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem6?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem7}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem7?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem8}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem8?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem9}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem9?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={notBoldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {investmentItem10}
                    </th>
                    <td style={notBoldCellStyle} className="px-6 py-1">
                      {investmentAmountItem10?.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b font-bold bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th
                      style={boldCellStyle}
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {words.total}
                    </th>
                    <td style={boldCellStyle} className="px-6 py-1">
                      {initialInvestmentAmount?.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
          </>
        ) : (
          <></>
        )}

        <h5>
          {words.firstYear} Income Statement({planCurrencySymbol} {planCurrency}
          )
        </h5>
        <h6>
          {words.firstYear} Income Statement {words.jan} - {words.jun} (
          {planCurrencySymbol} {planCurrency})
        </h6>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.jan}
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.feb}
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.mar}
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.apr}
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.may}
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.jun}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.revenue}
                </th>
                {revenue1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.cost} of Goods Sold
                </th>
                {COGS1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Gross {words.mar}gin
                </th>
                {grossMargin1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.operatingExpenses}
                </th>
                {Array.from({ length: 6 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  {words.wagesAndBenefits}
                </th>
                {wageCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.mar}keting
                </th>
                {markCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.rent}
                </th>
                {rentCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  General & Administrative
                </th>
                {genCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.depreciation}
                </th>
                {depreCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.utilities}
                </th>
                {utilCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Other expenses
                </th>
                {otherCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.total} Expenses
                </th>
                {totalExpense1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Earnings Before Interest & Taxes
                </th>
                {EBIT1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.interestExpense}
                </th>
                {intCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.earningsBeforeTaxes}
                </th>
                {EBT1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.incomeTaxes}
                </th>
                {taxCost1.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.netIncome}
                </th>
                {netIncome1.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <br />

        <h6>
          {words.firstYear} Income Statement {words.jul} - {words.dec} (
          {planCurrencySymbol} {planCurrency})
        </h6>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.jul}
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.aug}
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Sep
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Oct
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.nov}
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  {words.dec}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.revenue}
                </th>
                {revenue2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.cost} of Goods Sold
                </th>
                {COGS2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Gross {words.mar}gin
                </th>
                {grossMargin2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.operatingExpenses}
                </th>
                {Array.from({ length: 6 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  {words.wagesAndBenefits}
                </th>
                {wageCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.mar}keting
                </th>
                {markCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.rent}
                </th>
                {rentCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  General & Administrative
                </th>
                {genCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.depreciation}
                </th>
                {depreCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.utilities}
                </th>
                {utilCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.otherExpenses}
                </th>
                {otherCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.total} Expenses
                </th>
                {totalExpense2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Earnings Before Interest & Taxes
                </th>
                {EBIT2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.interestExpense}
                </th>
                {intCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.earningsBeforeTaxes}
                </th>
                {EBT2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.incomeTaxes}
                </th>
                {taxCost2.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.netIncome}
                </th>
                {netIncome2.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <br />
        <h5>
          Year 1 - 5 Income Statement({planCurrencySymbol} {planCurrency})
        </h5>
        <div className="overflow-x-scroll shadow-md sm:rounded-lg">
          <table
            style={tableStyle}
            className="w-full text-base text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              style={boldCellStyle}
              className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th
                  style={boldCellStyle}
                  scope="col"
                  className="px-6 py-2"
                ></th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Year 1
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Year 2
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Year 3
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Year 4
                </th>
                <th style={boldCellStyle} scope="col" className="px-6 py-2">
                  Year 5
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.revenue}
                </th>
                {revenueYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {(+item)?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.cost} of Goods Sold
                </th>
                {COGSYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Gross {words.mar}gin
                </th>
                {grossMarginYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.operatingExpenses}
                </th>
                {Array.from({ length: 5 }, (_, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {' '}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                >
                  {words.wagesAndBenefits}
                </th>
                {wageCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 font-light dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.mar}keting
                </th>
                {markCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b font-light dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.rent}
                </th>
                {rentCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  General & Administrative
                </th>
                {genCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.depreciation}
                </th>
                {depreCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.utilities}
                </th>
                {utilCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-b font-light bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={indentCellStyle}
                  scope="row"
                  className="px-6 py-1  font-light indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.otherExpenses}
                </th>
                {otherCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.total} Expenses
                </th>
                {totalExpenseYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Earnings Before Interest & Taxes
                </th>
                {EBITYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.interestExpense}
                </th>
                {intCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.earningsBeforeTaxes}
                </th>
                {EBTYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-light bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={notBoldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-light text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.incomeTaxes}
                </th>
                {taxCostYear.map((item, index) => (
                  <td
                    style={notBoldCellStyle}
                    key={index}
                    className="px-6 py-1"
                  >
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>

              <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
                <th
                  style={boldCellStyle}
                  scope="row"
                  className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {words.netIncome}
                </th>
                {netIncomeYear.map((item, index) => (
                  <td style={boldCellStyle} key={index} className="px-6 py-1">
                    {item?.toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

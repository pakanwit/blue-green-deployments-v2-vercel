export default function finTableExample(words) {
  return (
    <>
      <h4>{words.finance}</h4>
      <h5>{words.initialInvestmentUsd}</h5>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-base text-left text-gray-500 dark:text-gray-400">
          <thead className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-2" scope="col">
                {words.investmentItem}
              </th>
              <th className="px-6 py-2" scope="col">
                {words.cost}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th
                className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                construction
              </th>
              <td className="px-6 py-1">500,000</td>
            </tr>
            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                furnishings
              </th>
              <td className="px-6 py-1">300,000</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th
                className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                equipment
              </th>
              <td className="px-6 py-1">100,000</td>
            </tr>
            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                working capital
              </th>
              <td className="px-6 py-1">100,000</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th
                className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              ></th>
              <td className="px-6 py-1">0</td>
            </tr>
            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              ></th>
              <td className="px-6 py-1">0</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th
                className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              ></th>
              <td className="px-6 py-1">0</td>
            </tr>
            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              ></th>
              <td className="px-6 py-1">0</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th
                className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              ></th>
              <td className="px-6 py-1">0</td>
            </tr>
            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              ></th>
              <td className="px-6 py-1">0</td>
            </tr>
            <tr className="border-b font-bold bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.total}
              </th>
              <td className="px-6 py-1">1,000,000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <h5>{words.firstYearIncomeStatementUsd}</h5>
      <div className="overflow-x-scroll shadow-md sm:rounded-lg">
        <table className="w-full text-base text-left text-gray-500 dark:text-gray-400">
          <thead className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-2" scope="col"></th>
              <th className="px-6 py-2" scope="col">
                {words.jan}
              </th>
              <th className="px-6 py-2" scope="col">
                {words.feb}
              </th>
              <th className="px-6 py-2" scope="col">
                {words.mar}
              </th>
              <th className="px-6 py-2" scope="col">
                {words.apr}
              </th>
              <th className="px-6 py-2" scope="col">
                {words.may}
              </th>
              <th className="px-6 py-2" scope="col">
                {words.jun}
              </th>
              <th className="px-6 py-2" scope="col">
                {words.jul}
              </th>
              <th className="px-6 py-2" scope="col">
                {words.aug}
              </th>
              <th className="px-6 py-2" scope="col">
                Sep
              </th>
              <th className="px-6 py-2" scope="col">
                Oct
              </th>
              <th className="px-6 py-2" scope="col">
                {words.nov}
              </th>
              <th className="px-6 py-2" scope="col">
                {words.dec}
              </th>
              <th className="px-6 py-2" scope="col">
                {words.firstYear}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
              <th
                className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.revenue}
              </th>
              <td className="px-6 py-1">50,000</td>
              <td className="px-6 py-1">54,441</td>
              <td className="px-6 py-1">59,277</td>
              <td className="px-6 py-1">64,542</td>
              <td className="px-6 py-1">70,275</td>
              <td className="px-6 py-1">76,517</td>
              <td className="px-6 py-1">83,314</td>
              <td className="px-6 py-1">90,714</td>
              <td className="px-6 py-1">98,772</td>
              <td className="px-6 py-1">107,545</td>
              <td className="px-6 py-1">117,098</td>
              <td className="px-6 py-1">127,499</td>
              <td className="px-6 py-1">1,000,000</td>
            </tr>
            <tr className="border-b bg-gray-50 font-normal dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-normal text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.cogs}
              </th>
              <td className="px-6 py-1">20,000</td>
              <td className="px-6 py-1">21,776</td>
              <td className="px-6 py-1">23,711</td>
              <td className="px-6 py-1">25,817</td>
              <td className="px-6 py-1">28,110</td>
              <td className="px-6 py-1">30,607</td>
              <td className="px-6 py-1">33,326</td>
              <td className="px-6 py-1">36,286</td>
              <td className="px-6 py-1">39,509</td>
              <td className="px-6 py-1">43,018</td>
              <td className="px-6 py-1">46,839</td>
              <td className="px-6 py-1">51,000</td>
              <td className="px-6 py-1">400,000</td>
            </tr>
            <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
              <th
                className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.grossMargin}
              </th>
              <td className="px-6 py-1">30,000</td>
              <td className="px-6 py-1">32,665</td>
              <td className="px-6 py-1">35,566</td>
              <td className="px-6 py-1">38,725</td>
              <td className="px-6 py-1">42,165</td>
              <td className="px-6 py-1">45,910</td>
              <td className="px-6 py-1">49,988</td>
              <td className="px-6 py-1">54,428</td>
              <td className="px-6 py-1">59,263</td>
              <td className="px-6 py-1">64,527</td>
              <td className="px-6 py-1">70,259</td>
              <td className="px-6 py-1">76,499</td>
              <td className="px-6 py-1">600,000</td>
            </tr>
            <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.operatingExpenses}
              </th>
              <td className="px-6 py-1"> </td>
              <td className="px-6 py-1"> </td>
              <td className="px-6 py-1"> </td>
              <td className="px-6 py-1"> </td>
              <td className="px-6 py-1"> </td>
              <td className="px-6 py-1"> </td>
              <td className="px-6 py-1"> </td>
              <td className="px-6 py-1"> </td>
              <td className="px-6 py-1"> </td>
              <td className="px-6 py-1"> </td>
              <td className="px-6 py-1"> </td>
              <td className="px-6 py-1"> </td>
              <td className="px-6 py-1"> </td>
            </tr>
            <tr className="bg-white border-b font-normal dark:bg-gray-900 dark:border-gray-700">
              <th
                className="px-6 py-1 font-normal text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                scope="row"
              >
                {words.wagesAndBenefits}
              </th>
              <td className="px-6 py-1">3,000</td>
              <td className="px-6 py-1">3,266</td>
              <td className="px-6 py-1">3,557</td>
              <td className="px-6 py-1">3,873</td>
              <td className="px-6 py-1">4,217</td>
              <td className="px-6 py-1">4,591</td>
              <td className="px-6 py-1">4,999</td>
              <td className="px-6 py-1">5,443</td>
              <td className="px-6 py-1">5,926</td>
              <td className="px-6 py-1">6,453</td>
              <td className="px-6 py-1">7,026</td>
              <td className="px-6 py-1">7,650</td>
              <td className="px-6 py-1">60,000</td>
            </tr>
            <tr className="border-b bg-gray-50 font-normal dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-normal indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.marketing}
              </th>
              <td className="px-6 py-1">2,500</td>
              <td className="px-6 py-1">2,722</td>
              <td className="px-6 py-1">2,964</td>
              <td className="px-6 py-1">3,227</td>
              <td className="px-6 py-1">3,514</td>
              <td className="px-6 py-1">3,826</td>
              <td className="px-6 py-1">4,166</td>
              <td className="px-6 py-1">4,536</td>
              <td className="px-6 py-1">4,939</td>
              <td className="px-6 py-1">5,377</td>
              <td className="px-6 py-1">5,855</td>
              <td className="px-6 py-1">6,375</td>
              <td className="px-6 py-1">50,000</td>
            </tr>
            <tr className="bg-white border-b font-normal dark:bg-gray-900 dark:border-gray-700">
              <th
                className="px-6 py-1 font-normal indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.rent}
              </th>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
            </tr>
            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-normal indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.generalAdministrative}
              </th>
              <td className="px-6 py-1">500</td>
              <td className="px-6 py-1">544</td>
              <td className="px-6 py-1">593</td>
              <td className="px-6 py-1">645</td>
              <td className="px-6 py-1">703</td>
              <td className="px-6 py-1">765</td>
              <td className="px-6 py-1">833</td>
              <td className="px-6 py-1">907</td>
              <td className="px-6 py-1">988</td>
              <td className="px-6 py-1">1,075</td>
              <td className="px-6 py-1">1,171</td>
              <td className="px-6 py-1">1,275</td>
              <td className="px-6 py-1">10,000</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th
                className="px-6 py-1 font-normal indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.depreciation}
              </th>
              <td className="px-6 py-1">1,000</td>
              <td className="px-6 py-1">1,089</td>
              <td className="px-6 py-1">1,186</td>
              <td className="px-6 py-1">1,291</td>
              <td className="px-6 py-1">1,406</td>
              <td className="px-6 py-1">1,530</td>
              <td className="px-6 py-1">1,666</td>
              <td className="px-6 py-1">1,814</td>
              <td className="px-6 py-1">1,975</td>
              <td className="px-6 py-1">2,151</td>
              <td className="px-6 py-1">2,342</td>
              <td className="px-6 py-1">2,550</td>
              <td className="px-6 py-1">20,000</td>
            </tr>
            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-normal indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.utilities}
              </th>
              <td className="px-6 py-1">2,500</td>
              <td className="px-6 py-1">2,722</td>
              <td className="px-6 py-1">2,964</td>
              <td className="px-6 py-1">3,227</td>
              <td className="px-6 py-1">3,514</td>
              <td className="px-6 py-1">3,826</td>
              <td className="px-6 py-1">4,166</td>
              <td className="px-6 py-1">4,536</td>
              <td className="px-6 py-1">4,939</td>
              <td className="px-6 py-1">5,377</td>
              <td className="px-6 py-1">5,855</td>
              <td className="px-6 py-1">6,375</td>
              <td className="px-6 py-1">50,000</td>
            </tr>
            <tr className="border-b font-normal bg-white dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-normal indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.otherExpenses}
              </th>
              <td className="px-6 py-1">500</td>
              <td className="px-6 py-1">544</td>
              <td className="px-6 py-1">593</td>
              <td className="px-6 py-1">645</td>
              <td className="px-6 py-1">703</td>
              <td className="px-6 py-1">765</td>
              <td className="px-6 py-1">833</td>
              <td className="px-6 py-1">907</td>
              <td className="px-6 py-1">988</td>
              <td className="px-6 py-1">1,075</td>
              <td className="px-6 py-1">1,171</td>
              <td className="px-6 py-1">1,275</td>
              <td className="px-6 py-1">10,000</td>
            </tr>
            <tr className="border-b font-normal bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-normal text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.totalExpenses}
              </th>
              <td className="px-6 py-1">10,000</td>
              <td className="px-6 py-1">10,887</td>
              <td className="px-6 py-1">11,857</td>
              <td className="px-6 py-1">12,908</td>
              <td className="px-6 py-1">14,057</td>
              <td className="px-6 py-1">15,303</td>
              <td className="px-6 py-1">16,663</td>
              <td className="px-6 py-1">18,143</td>
              <td className="px-6 py-1">19,755</td>
              <td className="px-6 py-1">21,508</td>
              <td className="px-6 py-1">23,420</td>
              <td className="px-6 py-1">25,500</td>
              <td className="px-6 py-1">200,000</td>
            </tr>
            <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.earningsBeforeInterestTaxes}
              </th>
              <td className="px-6 py-1">20,000</td>
              <td className="px-6 py-1">21,778</td>
              <td className="px-6 py-1">23,709</td>
              <td className="px-6 py-1">25,817</td>
              <td className="px-6 py-1">28,108</td>
              <td className="px-6 py-1">30,607</td>
              <td className="px-6 py-1">33,325</td>
              <td className="px-6 py-1">36,285</td>
              <td className="px-6 py-1">39,508</td>
              <td className="px-6 py-1">43,019</td>
              <td className="px-6 py-1">46,839</td>
              <td className="px-6 py-1">50,999</td>
              <td className="px-6 py-1">400,000</td>
            </tr>
            <tr className="border-b font-normal bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-normal text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.interestExpense}
              </th>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
            </tr>
            <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.earningsBeforeTaxes}
              </th>
              <td className="px-6 py-1">20,000</td>
              <td className="px-6 py-1">21,778</td>
              <td className="px-6 py-1">23,709</td>
              <td className="px-6 py-1">25,817</td>
              <td className="px-6 py-1">28,108</td>
              <td className="px-6 py-1">30,607</td>
              <td className="px-6 py-1">33,325</td>
              <td className="px-6 py-1">36,285</td>
              <td className="px-6 py-1">39,508</td>
              <td className="px-6 py-1">43,019</td>
              <td className="px-6 py-1">46,839</td>
              <td className="px-6 py-1">50,999</td>
              <td className="px-6 py-1">400,000</td>
            </tr>
            <tr className="border-b font-normal bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-normal text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.incomeTaxes}
              </th>
              <td className="px-6 py-1">4,000</td>
              <td className="px-6 py-1">4,356</td>
              <td className="px-6 py-1">4,742</td>
              <td className="px-6 py-1">5,163</td>
              <td className="px-6 py-1">5,622</td>
              <td className="px-6 py-1">6,121</td>
              <td className="px-6 py-1">6,665</td>
              <td className="px-6 py-1">7,257</td>
              <td className="px-6 py-1">7,902</td>
              <td className="px-6 py-1">8,604</td>
              <td className="px-6 py-1">9,368</td>
              <td className="px-6 py-1">10,200</td>
              <td className="px-6 py-1">80,000</td>
            </tr>
            <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.netIncome}
              </th>
              <td className="px-6 py-1">16,000</td>
              <td className="px-6 py-1">17,422</td>
              <td className="px-6 py-1">18,967</td>
              <td className="px-6 py-1">20,654</td>
              <td className="px-6 py-1">22,486</td>
              <td className="px-6 py-1">24,486</td>
              <td className="px-6 py-1">26,660</td>
              <td className="px-6 py-1">29,028</td>
              <td className="px-6 py-1">31,606</td>
              <td className="px-6 py-1">34,415</td>
              <td className="px-6 py-1">37,471</td>
              <td className="px-6 py-1">40,799</td>
              <td className="px-6 py-1">320,000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <h5>{words.year1_5IncomeStatementUsd}</h5>
      <div className="overflow-x-scroll shadow-md sm:rounded-lg">
        <table className="w-full text-base text-left text-gray-500 dark:text-gray-400">
          <thead className="text-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-2" scope="col"></th>
              <th className="px-6 py-2" scope="col">
                {words.year1}
              </th>
              <th className="px-6 py-2" scope="col">
                {words.year2}
              </th>
              <th className="px-6 py-2" scope="col">
                {words.year3}
              </th>
              <th className="px-6 py-2" scope="col">
                {words.year4}
              </th>
              <th className="px-6 py-2" scope="col">
                {words.year5}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
              <th
                className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.revenue}
              </th>
              <td className="px-6 py-1">1,000,000</td>
              <td className="px-6 py-1">1,150,000</td>
              <td className="px-6 py-1">1,322,500</td>
              <td className="px-6 py-1">1,520,875</td>
              <td className="px-6 py-1">1,749,006</td>
            </tr>
            <tr className="border-b bg-gray-50 font-normal dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-normal text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.cogs}
              </th>
              <td className="px-6 py-1">400,000</td>
              <td className="px-6 py-1">460,000</td>
              <td className="px-6 py-1">529,000</td>
              <td className="px-6 py-1">608,350</td>
              <td className="px-6 py-1">699,602</td>
            </tr>
            <tr className="bg-white border-b font-bold dark:bg-gray-900 dark:border-gray-700">
              <th
                className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.grossMargin}
              </th>
              <td className="px-6 py-1">600,000</td>
              <td className="px-6 py-1">690,000</td>
              <td className="px-6 py-1">793,500</td>
              <td className="px-6 py-1">912,525</td>
              <td className="px-6 py-1">1,049,404</td>
            </tr>
            <tr className="border-b bg-gray-50 font-bold dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.operatingExpenses}
              </th>
              <td className="px-6 py-1"> </td>
              <td className="px-6 py-1"> </td>
              <td className="px-6 py-1"> </td>
              <td className="px-6 py-1"> </td>
              <td className="px-6 py-1"> </td>
            </tr>
            <tr className="bg-white border-b font-normal dark:bg-gray-900 dark:border-gray-700">
              <th
                className="px-6 py-1 font-normal text-gray-900 whitespace-nowrap dark:text-white indent-5 "
                scope="row"
              >
                {words.wagesAndBenefits}
              </th>
              <td className="px-6 py-1">60,000</td>
              <td className="px-6 py-1">69,000</td>
              <td className="px-6 py-1">79,350</td>
              <td className="px-6 py-1">91,253</td>
              <td className="px-6 py-1">104,940</td>
            </tr>
            <tr className="border-b bg-gray-50 font-normal dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-normal indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.marketing}
              </th>
              <td className="px-6 py-1">50,000</td>
              <td className="px-6 py-1">57,500</td>
              <td className="px-6 py-1">66,125</td>
              <td className="px-6 py-1">76,044</td>
              <td className="px-6 py-1">87,450</td>
            </tr>
            <tr className="bg-white border-b font-normal dark:bg-gray-900 dark:border-gray-700">
              <th
                className="px-6 py-1 font-normal indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.rent}
              </th>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
            </tr>
            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-normal indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.generalAdministrative}
              </th>
              <td className="px-6 py-1">10,000</td>
              <td className="px-6 py-1">11,500</td>
              <td className="px-6 py-1">13,225</td>
              <td className="px-6 py-1">15,209</td>
              <td className="px-6 py-1">17,490</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th
                className="px-6 py-1 font-normal indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.depreciation}
              </th>
              <td className="px-6 py-1">20,000</td>
              <td className="px-6 py-1">23,000</td>
              <td className="px-6 py-1">26,450</td>
              <td className="px-6 py-1">30,418</td>
              <td className="px-6 py-1">34,980</td>
            </tr>
            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-normal indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.utilities}
              </th>
              <td className="px-6 py-1">50,000</td>
              <td className="px-6 py-1">57,500</td>
              <td className="px-6 py-1">66,125</td>
              <td className="px-6 py-1">76,044</td>
              <td className="px-6 py-1">87,450</td>
            </tr>
            <tr className="border-b font-normal bg-white dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-normal indent-5 text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.otherExpenses}
              </th>
              <td className="px-6 py-1">10,000</td>
              <td className="px-6 py-1">11,500</td>
              <td className="px-6 py-1">13,225</td>
              <td className="px-6 py-1">15,209</td>
              <td className="px-6 py-1">17,490</td>
            </tr>
            <tr className="border-b font-normal bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-normal text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.totalExpenses}
              </th>
              <td className="px-6 py-1">200,000</td>
              <td className="px-6 py-1">230,000</td>
              <td className="px-6 py-1">264,500</td>
              <td className="px-6 py-1">304,177</td>
              <td className="px-6 py-1">349,800</td>
            </tr>
            <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.earningsBeforeInterestTaxes}
              </th>
              <td className="px-6 py-1">400,000</td>
              <td className="px-6 py-1">460,000</td>
              <td className="px-6 py-1">529,000</td>
              <td className="px-6 py-1">608,348</td>
              <td className="px-6 py-1">699,604</td>
            </tr>
            <tr className="border-b font-normal bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-normal text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.interestExpense}
              </th>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
              <td className="px-6 py-1">0</td>
            </tr>
            <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.earningsBeforeTaxes}
              </th>
              <td className="px-6 py-1">400,000</td>
              <td className="px-6 py-1">460,000</td>
              <td className="px-6 py-1">529,000</td>
              <td className="px-6 py-1">608,348</td>
              <td className="px-6 py-1">699,604</td>
            </tr>
            <tr className="border-b font-normal bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-normal text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.incomeTaxes}
              </th>
              <td className="px-6 py-1">80,000</td>
              <td className="px-6 py-1">92,000</td>
              <td className="px-6 py-1">105,800</td>
              <td className="px-6 py-1">121,670</td>
              <td className="px-6 py-1">139,921</td>
            </tr>
            <tr className="border-b font-bold bg-white dark:bg-gray-800 dark:border-gray-700">
              <th
                className="px-6 py-1 font-bold text-gray-900 whitespace-nowrap dark:text-white"
                scope="row"
              >
                {words.netIncome}
              </th>
              <td className="px-6 py-1">320,000</td>
              <td className="px-6 py-1">368,000</td>
              <td className="px-6 py-1">423,200</td>
              <td className="px-6 py-1">486,678</td>
              <td className="px-6 py-1">559,683</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
    </>
  );
}

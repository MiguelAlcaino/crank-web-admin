import { O as c, r as n, P as i } from "./index.823feddf.js";
const R = c`
  query TransactionRecords(
    $filter: TransactionRecordFilterInput
    $pagination: PaginationInput
  ) {
    transactionRecords(filter: $filter, pagination: $pagination) {
      items {
        id
        amount
        status
        created
        customerName
        customerEmail
        siteName
        isRefundable
        creditCardLastFourDigits
        authorizationCode
        items {
          id
          name
          quantity
          amount
        }
      }
      totalCount
      page
      limit
    }
  }
`, g = c`
  query TransactionRecord($id: ID!) {
    transactionRecord(id: $id) {
      id
      creditCardChargeId
      creditCardHolderName
      creditCardLastFourDigits
      amount
      taxAmount
      subTotal
      status
      created
      refundDate
      authorizationCode
      installments
      merchantPurchaseId
      customerName
      customerEmail
      siteName
      isRefundable
      items {
        id
        name
        quantity
        amount
      }
      shoppingCart {
        id
        currency
        items {
          id
          quantity
          subtotal
          variant {
            id
            name
            price
          }
        }
      }
    }
  }
`, h = c`
  mutation RefundTransaction($id: ID!) {
    refundTransaction(id: $id)
  }
`, p = (o) => {
  const d = n(null), u = n(null), r = n(!1), l = n(!1), t = n(!1), s = n("");
  async function m(e, a) {
    r.value = !0, t.value = !1;
    try {
      const { data: f } = await o.query({
        query: R,
        variables: {
          filter: e && Object.keys(e).length > 0 ? e : void 0,
          pagination: a
        },
        fetchPolicy: "network-only"
      });
      d.value = f.transactionRecords;
    } catch {
      t.value = !0, s.value = "Failed to load transactions";
    } finally {
      r.value = !1;
    }
  }
  async function y(e) {
    r.value = !0, t.value = !1, u.value = null;
    try {
      const { data: a } = await o.query({
        query: g,
        variables: { id: e },
        fetchPolicy: "network-only"
      });
      u.value = a.transactionRecord;
    } catch {
      t.value = !0, s.value = "Failed to load transaction";
    } finally {
      r.value = !1;
    }
  }
  async function v(e) {
    l.value = !0, t.value = !1;
    try {
      const { data: a } = await o.mutate({
        mutation: h,
        variables: { id: e }
      });
      return !!(a != null && a.refundTransaction);
    } catch {
      return t.value = !0, s.value = "Failed to process refund", !1;
    } finally {
      l.value = !1;
    }
  }
  return {
    listResult: i(d),
    detail: i(u),
    isLoading: i(r),
    isRefunding: i(l),
    hasError: i(t),
    errorMessage: i(s),
    fetchList: m,
    fetchDetail: y,
    refund: v
  };
};
export {
  p as u
};

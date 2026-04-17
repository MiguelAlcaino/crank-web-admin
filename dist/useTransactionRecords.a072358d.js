import { O as l, r as n, P as r } from "./index.36a9744c.js";
const g = l`
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
        shoppingCart {
          currency
        }
      }
      totalCount
      page
      limit
    }
  }
`, R = l`
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
`, h = l`
  mutation RefundTransaction($id: ID!) {
    refundTransaction(id: $id)
  }
`, T = (o) => {
  const d = n(null), u = n(null), i = n(!1), c = n(!1), t = n(!1), s = n("");
  async function m(e, a) {
    i.value = !0, t.value = !1;
    try {
      const { data: f } = await o.query({
        query: g,
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
      i.value = !1;
    }
  }
  async function y(e) {
    i.value = !0, t.value = !1, u.value = null;
    try {
      const { data: a } = await o.query({
        query: R,
        variables: { id: e },
        fetchPolicy: "network-only"
      });
      u.value = a.transactionRecord;
    } catch {
      t.value = !0, s.value = "Failed to load transaction";
    } finally {
      i.value = !1;
    }
  }
  async function v(e) {
    c.value = !0, t.value = !1;
    try {
      const { data: a } = await o.mutate({
        mutation: h,
        variables: { id: e }
      });
      return !!(a != null && a.refundTransaction);
    } catch {
      return t.value = !0, s.value = "Failed to process refund", !1;
    } finally {
      c.value = !1;
    }
  }
  return {
    listResult: r(d),
    detail: r(u),
    isLoading: r(i),
    isRefunding: r(c),
    hasError: r(t),
    errorMessage: r(s),
    fetchList: m,
    fetchDetail: y,
    refund: v
  };
};
export {
  T as u
};

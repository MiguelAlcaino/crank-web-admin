import { M as c, r as n, N as i } from "./index.13471187.js";
const R = c`
  query AdminTransactionRecords(
    $filter: AdminTransactionRecordFilterInput
    $pagination: PaginationInput
  ) {
    adminTransactionRecords(filter: $filter, pagination: $pagination) {
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
  query AdminTransactionRecord($id: ID!) {
    adminTransactionRecord(id: $id) {
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
    }
  }
`, T = c`
  mutation RefundTransaction($id: ID!) {
    refundTransaction(id: $id)
  }
`, q = (o) => {
  const d = n(null), u = n(null), r = n(!1), l = n(!1), e = n(!1), s = n("");
  async function f(t, a) {
    r.value = !0, e.value = !1;
    try {
      const { data: m } = await o.query({
        query: R,
        variables: {
          filter: t && Object.keys(t).length > 0 ? t : void 0,
          pagination: a
        },
        fetchPolicy: "network-only"
      });
      d.value = m.adminTransactionRecords;
    } catch {
      e.value = !0, s.value = "Failed to load transactions";
    } finally {
      r.value = !1;
    }
  }
  async function y(t) {
    r.value = !0, e.value = !1, u.value = null;
    try {
      const { data: a } = await o.query({
        query: g,
        variables: { id: t },
        fetchPolicy: "network-only"
      });
      u.value = a.adminTransactionRecord;
    } catch {
      e.value = !0, s.value = "Failed to load transaction";
    } finally {
      r.value = !1;
    }
  }
  async function v(t) {
    l.value = !0, e.value = !1;
    try {
      const { data: a } = await o.mutate({
        mutation: T,
        variables: { id: t }
      });
      return !!(a != null && a.refundTransaction);
    } catch {
      return e.value = !0, s.value = "Failed to process refund", !1;
    } finally {
      l.value = !1;
    }
  }
  return {
    listResult: i(d),
    detail: i(u),
    isLoading: i(r),
    isRefunding: i(l),
    hasError: i(e),
    errorMessage: i(s),
    fetchList: f,
    fetchDetail: y,
    refund: v
  };
};
export {
  q as u
};

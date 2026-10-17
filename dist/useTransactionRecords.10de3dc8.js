import { ac as n, ad as E, P as p, Q as C, r, ae as o } from "./index.cb70f358.js";
const f = n`
  fragment TransactionRecordListFields on TransactionRecord {
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
`, T = n`
  fragment TransactionRecordDetailFields on TransactionRecord {
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
    siteCustomer {
      identifiableUser {
        id
      }
    }
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
`, g = n`
  mutation RefundTransaction($id: ID!) {
    refundTransaction(id: $id)
  }
`, A = n`
  query TransactionRecords($filter: TransactionRecordFilterInput, $pagination: PaginationInput) {
    transactionRecords(filter: $filter, pagination: $pagination) {
      items {
        ...TransactionRecordListFields
        shoppingCart {
          currency
        }
      }
      totalCount
      page
      limit
    }
  }
  ${f}
`, h = n`
  query TransactionRecord($id: ID!) {
    transactionRecord(id: $id) {
      ...TransactionRecordDetailFields
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
  ${T}
`, D = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TRANSACTION_RECORDS_QUERY: A,
  TRANSACTION_RECORD_QUERY: h
}, Symbol.toStringTag, { value: "Module" })), N = n`
  query TransactionRecords($filter: TransactionRecordFilterInput, $pagination: PaginationInput) {
    transactionRecords(filter: $filter, pagination: $pagination) {
      items {
        ...TransactionRecordListFields
        paymentMethod
      }
      totalCount
      page
      limit
    }
  }
  ${f}
`, O = n`
  query TransactionRecord($id: ID!) {
    transactionRecord(id: $id) {
      ...TransactionRecordDetailFields
      paymentMethod
      payfortAuthorizationCode
      serviceExpirationDate
      userCountry
      mindbodyCheckoutFail
      merchantResponse
      paymentGatewayResponse
      refundResponse
    }
  }
  ${T}
`, S = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TRANSACTION_RECORDS_QUERY: N,
  TRANSACTION_RECORD_QUERY: O
}, Symbol.toStringTag, { value: "Module" })), v = {
  "transaction_record.not_found": "The transaction no longer exists",
  "transaction_record.already_refunded": "This transaction has already been refunded",
  "transaction_record.refund_window_expired": "The refund window for this transaction has expired",
  "transaction_record.payfort_refund_failed": "Payfort rejected the refund"
}, I = "Failed to process refund";
function F(i) {
  const s = E(i);
  return s && v[s] || I;
}
const { TRANSACTION_RECORDS_QUERY: $, TRANSACTION_RECORD_QUERY: b } = p(C.TransactionShoppingCart) ? D : S, L = (i) => {
  const s = r(null), u = r(null), c = r(!1), l = r(!1), a = r(!1), d = r("");
  async function _(t, e) {
    c.value = !0, a.value = !1;
    try {
      const { data: R } = await i.query({
        query: $,
        variables: {
          filter: t && Object.keys(t).length > 0 ? t : void 0,
          pagination: e
        },
        fetchPolicy: "network-only"
      });
      s.value = R.transactionRecords;
    } catch {
      a.value = !0, d.value = "Failed to load transactions";
    } finally {
      c.value = !1;
    }
  }
  async function m(t) {
    c.value = !0, a.value = !1, u.value = null;
    try {
      const { data: e } = await i.query({
        query: b,
        variables: { id: t },
        fetchPolicy: "network-only"
      });
      u.value = e.transactionRecord;
    } catch {
      a.value = !0, d.value = "Failed to load transaction";
    } finally {
      c.value = !1;
    }
  }
  async function y(t) {
    l.value = !0, a.value = !1;
    try {
      const { data: e } = await i.mutate({
        mutation: g,
        variables: { id: t }
      });
      return !!(e != null && e.refundTransaction);
    } catch (e) {
      return a.value = !0, d.value = F(e), !1;
    } finally {
      l.value = !1;
    }
  }
  return {
    listResult: o(s),
    detail: o(u),
    isLoading: o(c),
    isRefunding: o(l),
    hasError: o(a),
    errorMessage: o(d),
    fetchList: _,
    fetchDetail: m,
    refund: y
  };
};
export {
  L as u
};

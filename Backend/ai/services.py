def predict_tax(case):
    income = case.get('income', 0)
    expenses = case.get('expenses', 0)

    taxable_income = max(income - expenses, 0)

    if taxable_income <= 200_000_000:
        tax = taxable_income * 0.10
    elif taxable_income <= 500_000_000:
        tax = taxable_income * 0.15
    else:
        tax = taxable_income * 0.25

    risk_score = min(int(taxable_income / 10_000_000), 100)

    return {
        "predicted_tax": int(tax),
        "risk_score": risk_score,
        "taxable_income": taxable_income
    }

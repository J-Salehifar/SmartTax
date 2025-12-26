import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from .models import Case

def train_and_predict(income , tax_amount):
    cases = Case.objects.all()
 
    if len(Case) < 5 :
        return"داده کافی برای پیش بینی وجود ندارد"
    
    data = []
    labels = []

    for case in cases:
        data .append([case.income, tax_amount])
        if case.status == 'succes':
            labels.append(1)
        elif case.status == 'rejected':
            labels.append(0)
        else :
            labels.append(2)

    df = pd.DataFrame(data, columns=['income','tax_amount'])
    model = DecisionTreeClassifier()
    model.fit(model, labels)

    prediction = model.predict([[income, tax_amount]])

    if prediction[0] == 1 :
        return "موفق"
    elif prediction[0] == 0 :
        return "رد شده"
    else:
        return "در حال بررسی"

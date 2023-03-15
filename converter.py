import json
import pandas as pd
from datetime import datetime
from IPython.display import display

csvFilePath = 'robinhood-2022.csv'

df = pd.read_csv(csvFilePath)
df = df[['DESCRIPTION', 'DATE ACQUIRED', 'SALE DATE', 'SALES PRICE', 'COST BASIS', 'WASH AMT DISALLOWED',
     'TERM', 'FED TAX WITHHELD', 'PAYER NAME1','PAYER NAME2', 'PAYER ADDR1','PAYER ADDR2','PAYER ADDR3',
     'PAYER CITY','PAYER STATE','PAYER ZIP']]

#clean the data
def convert_date(date):
    if date == 0:
        return "N/A"
    else:
        return datetime.strptime(str(date), '%Y%m%d').strftime('%m/%d/%Y')

df['FED TAX WITHHELD'] = df['FED TAX WITHHELD'].fillna(0)
df["SALE DATE"] = df["SALE DATE"].apply(lambda date: datetime.strptime(str(date), '%Y%m%d').strftime('%m/%d/%Y'))
df['DATE ACQUIRED'] = df['DATE ACQUIRED'].fillna(0).astype(int)
df["DATE ACQUIRED"] = df["DATE ACQUIRED"].apply(convert_date)

df["PAYER NAME"] = df['PAYER NAME1'] + " " + df['PAYER NAME2']
df["PAYER ADDR"] = df['PAYER ADDR1']
df = df.drop(columns=['PAYER NAME1', 'PAYER NAME2'])
df = df.drop(columns=['PAYER ADDR1', 'PAYER ADDR2', 'PAYER ADDR3'])

df.to_json('robinhood-2022.json', orient='records')
display(df)
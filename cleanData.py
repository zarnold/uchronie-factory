import pandas as pd 
import os
import re
import io


DATASET_PATH = os.path.join('.','dataset','chronology.csv')
with open(DATASET_PATH,'r', encoding='utf8') as f:
    txt = f.read()


#  Replace comma after the first one with none
txt = re.sub(
           "(\n[0-9]{4},.*),",
           "\\1 -",
           txt
       )

# Replace reference
txt = re.sub(
           "\[[0-9].*\]",
           " -- ",
           txt
       )



data = io.StringIO(txt)
df = pd.read_csv(data, sep=",",header=None, error_bad_lines=False)
df.columns=['year','event']

df = df[df['year'].str.isnumeric()]
df =df.set_index('year')

df.to_csv('./dataset/cleanChronology.csv',sep=';')

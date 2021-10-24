mas = ('а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ы' ,'ъ','э', 'ю', 'я', '.',',',':',';','?','!','(',')','-','"',' ')

word="извилистость"
key="аббревиатура"
mas_word=[]
mas_key=[]

for i in range(len(word)):
    mas_word.append(mas.index(word[i]))
for i in range(len(key)):
    mas_key.append(mas.index(key[i]))

mas_reword=[]
for i in range(len(mas_word)):
    mas_reword.append((mas_word[i]+mas_key[i])%44)

reword=""

for i in range(len(mas_word)):
    reword+=mas[mas_reword[i]]

print(reword)

mas_word=[]

for i in range(len(mas_reword)):
    mas_word.append((mas_reword[i]-mas_key[i])%44)

word1=""

for i in range(len(mas_word)):
    word1+=mas[mas_word[i]]

print(word1)
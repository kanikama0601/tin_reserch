import numpy as np
import math
import random

min_prime = 100 #素数の最小値
max_prime = 200 #素数の最大値
#-----------------------------------------------------
# 素数判定・素数の生成

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True

def random_prime():
    while True:
        p = random.randint(min_prime, max_prime)
        if is_prime(p):
            return p

def random_prime_2(a):
    while True:
        p = random.randint(min_prime, max_prime)
        if is_prime(p):
            if math.gcd(p, a) == 1:
                return p

#-----------------------------------------------------
# 素数の生成

p = random_prime()
while 1:
    q = random_prime()
    if math.gcd(p, q) == 1:
        break

N = p * q
phi = (p-1) * (q-1) #最小公倍数

# E = random_prime_2(phi)
E = 65537

while 1:
    try:
        D = pow(E, -1, phi)
        break
    except ValueError:
        print("D value error")


print(f"p = {p}")
print(f"q = {q}")
print(f"N = {N}")
print(f"phi = {phi}")
print(f"E = {E}")
print(f"D = {D}\n")
print(f"公開鍵 = ({E}, {N})")
print(f"秘密鍵 = ({D}, {N})")

#暗号化
def encrypt(m, e, n):
    plain_unicode = [ord(char) for char in m]
    encrypted_unicode = [pow(char, e, n) for char in plain_unicode]
    print(encrypted_unicode)
    encrypted_text = ''.join(chr(i) for i in encrypted_unicode)
    return encrypted_text

#復号化
def decrypt(c, d, n):
    return pow(c, d, n)

#メッセージ
word = "hello world"
print(f"m(暗号化前) = {word}")

text = encrypt(word, E, N) # 暗号化

print(f"c(暗号化後) = {text}")

with open("/Users/owner/Desktop/tin_reserch/kohara/encryption/rsa/generate/encrypted.txt","w") as o:
    print(text, file=o)

with open("/Users/owner/Desktop/tin_reserch/kohara/encryption/rsa/generate/秘密鍵.txt","w") as f:
    print(f"{D}\n{N}", file=f)
from language import splitter, joiner

code = """
print(1+1)
"""

step_1 = splitter.split(code)
step_2 = joiner.rejoin(step_1)
print(step_2.tokenlist[0].evaluate().value)
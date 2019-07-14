import json
import re

from . import tokens
from .exceptions import GrammarException

grammar = json.load(open("language/grammar.json", "r"))

def split(code:str) -> tokens.Token_1:
    token_1s = []
    #region code to token strings
    pattern = re.compile("|".join(grammar.keys()))
    matches = [match.group() for match in pattern.finditer(code)]
    #endregion
    #region token strings to Token_1's
    for match in matches:
        for key in grammar.keys():
            if re.match(key, match):
                break
        else:
            raise GrammarException("Grammar Exception: Grammar broke, you fuck")
        token_1s.append(tokens.Token_1(grammar[key], match))
    #endregion
    return token_1s
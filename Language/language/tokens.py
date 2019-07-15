from abc import ABC, abstractmethod

class Token_1():
    #region documentation
    """ Token_1's are used for containins small chunks of code,
    later going to be changed into Token_2's. """
    #endregion
    def __init__(self, type:str, value:str):
        self.type = type
        self.value = value
    def __repr__(self):
        return "Token_1(type: %s, value: '%s')" % (self.type, self.value)

class Token_2(ABC):
    #region documentation
    """ Token_2's are used for containing more refined structures of code.
    They are classified as:
        - Value
            - String
            - Number
            - Variable
                - Functionm
                    - +, -, *, //
                    - . accesor
                    - Statement
                        - If, Else, For, etc
                - Class
            - Data Type (Lists, etc.).
    
    This class is abstract, and will only be inherited for methods to be used.
    
    Functions:
        reference()
        evaluate()
        
        check(token_1)
        valuize(token_1)
    """
    
    @abstractmethod
    def check(self, tokenstream): pass
    @abstractmethod
    def evaluate(self): pass
    #endregion

class Value(Token_2):
    def __init__(self, value):
        self.type = "Value"
        self.value = value

class Number(Value):
    def __init__(self, value):
        self.type = "Number"
        self.value = float(value)
    @classmethod
    def check(cls, tokenstream):
        if (tokenstream.rpeek().type == "VAL_NUMBER"): #im fucking lazy, goddamit
            tokenstream.radvance()    
            tokenstream.leave(cls(tokenstream.take()[0].value))
            return True
        tokenstream.turndown()
        return False
    def evaluate(self):
        return self
    def __add__(self, other): return Number(self.value + other.value)
    def __sub__(self, other): return Number(self.value - other.value)
    def __mul__(self, other): return Number(self.value * other.value)
    def __truediv__(self, other): return Number(self.value / other.value)


class Variable(Value):
    def __init__(self, name, scope):
        self.type = "Variable"
        self.name = name
        self.scope = scope.freezescope()
        scope[name] = self
    def evaluate(self):
        joiner.scope.setscope(self.scope)
        return joiner.scope[name]

class Function(Variable):
    def __init__(self, name, code, scope):
        self.type = "Function"
        self.name = name
        self.code = code
        self.scope = scope.freezescope()
        scope[name] = self
    @classmethod
    def check(self, tokenstream):
        pass #later

class SystemFunction(Function):
    def __init__(self, name, code, scope):
        super().__init__(name, code, scope)
    def evaluate(self, args):
        self.code(args)
    @classmethod
    def check(self, tokenstream):
        # Never in a thousand years motherfucker
        return False

class CallFunction(Value):
    def __init__(self, name, args, scope):
        self.type = "CallFunction"
        self.name = name
        self.args = args
        self.scope = scope.freezescope()
    @classmethod
    def check(cls, tokenstream):
        if (tokenstream.rpeek().type == "VAL_VARIABLE"):
            name = tokenstream.radvance()
            if (tokenstream.rpeek().type == "SYM_LPAREN"):
                tokenstream.radvance()
                parencount = 1
                callValues = []
                while tokenstream.rpeekable():
                    advance = tokenstream.radvance()
                    if (advance.type == "SYM_LPAREN"): parencount += 1
                    elif (advance.type == "SYM_RPAREN"): parencount -= 1
                    if  (parencount == 0): break
                    callValues.append(advance)
                tokenstream.take()
                tokenstream.leave(cls(name.value,joiner.rejoin(callValues),joiner.scope))
        tokenstream.turndown()
        return False
    def evaluate(self):
        joiner.scope.setscope(self.scope)
        args = self.args.tokenlist[0]
        return joiner.scope[self.name].evaluate(args.evaluate()) #debug

class Operator(Function):
    operators = ""
    def __init__(self, operator, left, right):
        self.type = "Operator"
        self.operator = operator
        self.left = left
        self.right = right
    @classmethod
    def check(cls, tokenstream):
        if (tokenstream.rpeek().type == "SYM_OPERATOR"):
            if (tokenstream.rpeek().value in cls.operators):
                operator = tokenstream.radvance()
                left = tokenstream.ladvance()
                right = tokenstream.radvance()
                tokenlist = tokenstream.take()
                tokenstream.leave(cls(operator.value, left, right))
                return True
        tokenstream.turndown()
        return False
class MultDiv(Operator):
    operators = "*/"
    def evaluate(self):
        if (self.operator == "*"): return self.left.evaluate() * self.right.evaluate()
        elif (self.operator == "/"): return self.left.evaluate() / self.right.evaluate()
class AddSub(Operator):
    operators = "+-"
    def evaluate(self):
        if (self.operator == "+"): return self.left.evaluate() + self.right.evaluate()
        elif (self.operator == "-"): return self.left.evaluate() - self.right.evaluate()

token2_list = [CallFunction, Number, MultDiv, AddSub]

from . import joiner #mutually dependent

SystemFunction("print", lambda x: print(x.value), joiner.scope)
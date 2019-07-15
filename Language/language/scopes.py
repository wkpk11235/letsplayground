import copy

class Scope():
    def __init__(self, scope="main"):
        self.scope = [scope]
        self.data = {"main": {}}
        self.scopedata = self.getscopedata()
    def freezescope(self):
        return copy.copy(self.scope)
    def setscope(self, scope):
        self.scope = scope
        self.scopedata = self.getscopedata()
    def upscope(self, scope):
        self.scope.append(scope)
        self.scopedata.setdefault(scope,{})
        self.scopedata = self.scopedata[scope]
    def downscope(self):
        if (len(self.scope)>1):
            del self.scope[-1]
            self.scopedata = self.getscopedata()
            return True
        else: return False
    def getscopedata(self):
        scopedata = self.data
        for i in self.scope:
            scopedata = scopedata[i]
        return scopedata
    def __getitem__(self, item):
        if item in self.scopedata: return self.scopedata[item]
        while self.downscope():
            if item in self.data: return self.data[item]
        return False
    def __setitem__(self, item, value):
        self.scopedata[item] = value
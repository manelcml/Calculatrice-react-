import React, { useState } from ‘react’;
import { RotateCcw, Clock, Calculator } from ‘lucide-react’;

const MathCalculator = () => {
const [display, setDisplay] = useState(‘0’);
const [previousValue, setPreviousValue] = useState(null);
const [operation, setOperation] = useState(null);
const [waitingForOperand, setWaitingForOperand] = useState(false);
const [history, setHistory] = useState([]);
const [showHistory, setShowHistory] = useState(false);

// Fonction pour gérer la saisie des chiffres
const inputNumber = (num) => {
if (waitingForOperand) {
setDisplay(String(num));
setWaitingForOperand(false);
} else {
setDisplay(display === ‘0’ ? String(num) : display + num);
}
};

// Gestion du point décimal
const inputDecimal = () => {
if (waitingForOperand) {
setDisplay(‘0.’);
setWaitingForOperand(false);
} else if (display.indexOf(’.’) === -1) {
setDisplay(display + ‘.’);
}
};

// Remise à zéro complète
const clearAll = () => {
setDisplay(‘0’);
setPreviousValue(null);
setOperation(null);
setWaitingForOperand(false);
};

// Logique principale des calculs - partie que j’ai trouvé la plus difficile
const performOperation = (nextOperation) => {
const inputValue = parseFloat(display);

```
if (previousValue === null) {
  setPreviousValue(inputValue);
} else if (operation) {
  const currentValue = previousValue || 0;
  let result;

  // Switch pour les différentes opérations
  switch (operation) {
    case '+':
      result = currentValue + inputValue;
      break;
    case '-':
      result = currentValue - inputValue;
      break;
    case '×':
      result = currentValue * inputValue;
      break;
    case '÷':
      result = inputValue !== 0 ? currentValue / inputValue : 0; // Protection division par zéro
      break;
    default:
      return;
  }

  // Ajouter le calcul à l'historique
  const calculation = `${currentValue} ${operation} ${inputValue} = ${result}`;
  setHistory(prev => [calculation, ...prev.slice(0, 7)]); // Je garde seulement 8 calculs max

  setDisplay(String(result));
  setPreviousValue(result);
}

setWaitingForOperand(true);
setOperation(nextOperation);
```

};

// Fonctions mathématiques que j’utilise souvent en cours
const mathOperation = (func) => {
const inputValue = parseFloat(display);
let result;

```
switch (func) {
  case 'racine':
    result = inputValue >= 0 ? Math.sqrt(inputValue) : 0; // Protection racine de nombre négatif
    break;
  case 'carre':
    result = Math.pow(inputValue, 2);
    break;
  case 'pourcent':
    result = inputValue / 100;
    break;
  case 'inverse':
    result = inputValue * -1;
    break;
  default:
    return;
}

const calculation = `${func}(${inputValue}) = ${result}`;
setHistory(prev => [calculation, ...prev.slice(0, 7)]);

setDisplay(String(result));
setWaitingForOperand(true);
```

};

const calculate = () => {
performOperation(null);
setOperation(null);
setPreviousValue(null);
setWaitingForOperand(true);
};

// Composant bouton que j’ai créé pour éviter de répéter le code
const CalcButton = ({ onClick, className, children, disabled }) => (
<button
onClick={onClick}
disabled={disabled}
className={`h-14 rounded-xl font-semibold transition-all duration-150 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 ${className}`}
>
{children}
</button>
);

return (
<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 p-4">
<div className="max-w-5xl mx-auto">
{/* En-tête personnalisé */}
<header className="text-center mb-8">
<div className="flex items-center justify-center gap-3 mb-4">
<Calculator className="text-emerald-400" size={36} />
<h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
MathPro Calculator
</h1>
</div>
<p className="text-slate-300">Développé par Manel - Terminale Math/NSI 2025</p>
<p className="text-slate-400 text-sm mt-2">Projet personnel pour candidature BUT Informatique</p>
</header>

```
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Interface principale */}
      <div className="lg:col-span-3">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
          {/* Écran d'affichage */}
          <div className="bg-slate-900/80 rounded-2xl p-6 mb-6 shadow-inner">
            <div className="text-right">
              <div className="text-slate-400 text-sm mb-2 h-6">
                {previousValue !== null && operation && `${previousValue} ${operation}`}
              </div>
              <div className="text-white text-5xl font-mono font-bold break-all min-h-[60px] flex items-center justify-end">
                {display}
              </div>
            </div>
          </div>

          {/* Grille des boutons - layout que j'ai pensé pour être intuitif */}
          <div className="grid grid-cols-4 gap-4">
            {/* Première ligne */}
            <CalcButton onClick={clearAll} className="bg-red-500 hover:bg-red-600 text-white">
              AC
            </CalcButton>
            <CalcButton onClick={() => mathOperation('inverse')} className="bg-emerald-500 hover:bg-emerald-600 text-white">
              +/-
            </CalcButton>
            <CalcButton onClick={() => mathOperation('pourcent')} className="bg-emerald-500 hover:bg-emerald-600 text-white">
              %
            </CalcButton>
            <CalcButton onClick={() => performOperation('÷')} className="bg-orange-500 hover:bg-orange-600 text-white">
              ÷
            </CalcButton>

            {/* Deuxième ligne */}
            <CalcButton onClick={() => inputNumber(7)} className="bg-slate-600 hover:bg-slate-700 text-white">
              7
            </CalcButton>
            <CalcButton onClick={() => inputNumber(8)} className="bg-slate-600 hover:bg-slate-700 text-white">
              8
            </CalcButton>
            <CalcButton onClick={() => inputNumber(9)} className="bg-slate-600 hover:bg-slate-700 text-white">
              9
            </CalcButton>
            <CalcButton onClick={() => performOperation('×')} className="bg-orange-500 hover:bg-orange-600 text-white">
              ×
            </CalcButton>

            {/* Troisième ligne */}
            <CalcButton onClick={() => inputNumber(4)} className="bg-slate-600 hover:bg-slate-700 text-white">
              4
            </CalcButton>
            <CalcButton onClick={() => inputNumber(5)} className="bg-slate-600 hover:bg-slate-700 text-white">
              5
            </CalcButton>
            <CalcButton onClick={() => inputNumber(6)} className="bg-slate-600 hover:bg-slate-700 text-white">
              6
            </CalcButton>
            <CalcButton onClick={() => performOperation('-')} className="bg-orange-500 hover:bg-orange-600 text-white">
              -
            </CalcButton>

            {/* Quatrième ligne */}
            <CalcButton onClick={() => inputNumber(1)} className="bg-slate-600 hover:bg-slate-700 text-white">
              1
            </CalcButton>
            <CalcButton onClick={() => inputNumber(2)} className="bg-slate-600 hover:bg-slate-700 text-white">
              2
            </CalcButton>
            <CalcButton onClick={() => inputNumber(3)} className="bg-slate-600 hover:bg-slate-700 text-white">
              3
            </CalcButton>
            <CalcButton onClick={() => performOperation('+')} className="bg-orange-500 hover:bg-orange-600 text-white">
              +
            </CalcButton>

            {/* Cinquième ligne */}
            <CalcButton onClick={() => inputNumber(0)} className="bg-slate-600 hover:bg-slate-700 text-white col-span-2">
              0
            </CalcButton>
            <CalcButton onClick={inputDecimal} className="bg-slate-600 hover:bg-slate-700 text-white">
              ,
            </CalcButton>
            <CalcButton onClick={calculate} className="bg-emerald-500 hover:bg-emerald-600 text-white">
              =
            </CalcButton>

            {/* Fonctions mathématiques - j'ai ajouté celles qu'on utilise le plus */}
            <CalcButton onClick={() => mathOperation('racine')} className="bg-violet-500 hover:bg-violet-600 text-white">
              √x
            </CalcButton>
            <CalcButton onClick={() => mathOperation('carre')} className="bg-violet-500 hover:bg-violet-600 text-white">
              x²
            </CalcButton>
            <CalcButton onClick={() => setShowHistory(!showHistory)} className="bg-blue-500 hover:bg-blue-600 text-white col-span-2 flex items-center justify-center gap-2">
              <Clock size={20} />
              {showHistory ? 'Masquer' : 'Historique'}
            </CalcButton>
          </div>
        </div>
      </div>

      {/* Panel historique */}
      <div className="lg:col-span-1">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Mes calculs</h2>
            <button
              onClick={() => setHistory([])}
              className="text-red-400 hover:text-red-300 text-sm transition-colors"
            >
              Tout effacer
            </button>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {history.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-400">Aucun calcul pour le moment</p>
                <p className="text-slate-500 text-sm mt-2">Vos opérations apparaîtront ici</p>
              </div>
            ) : (
              history.map((calc, index) => (
                <div
                  key={index}
                  className="bg-slate-800/60 rounded-xl p-3 text-sm text-slate-200 font-mono border border-slate-700/50"
                >
                  {calc}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Info techniques - pour montrer que je comprends ce que j'ai fait */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl mt-6">
          <h3 className="text-lg font-semibold text-white mb-3">Fonctionnalités</h3>
          <div className="space-y-2 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-violet-500 rounded-full"></div>
              <span>Fonctions mathématiques (√, x²)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span>Calculs en pourcentage</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>Opérations en chaîne</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Historique des calculs</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-700">
            <p className="text-xs text-slate-400">
              Technologies : React, JavaScript ES6+, Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </div>

    
    <footer className="text-center mt-8 text-slate-400">
      <p className="mb-2">MathPro Calculator - Projet développé en React</p>
      <p className="text-sm">
         
        <span className="text-emerald-400 ml-1">Terminale Math/NSI 2025</span>
      </p>
    </footer>
  </div>
</div>
```

);
};

export default MathCalculator;

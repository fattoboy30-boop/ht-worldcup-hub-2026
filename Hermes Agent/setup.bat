@echo off
echo ========================================
echo   Hermes Agent - Free AI Setup
echo   HT World Cup Hub Automation
echo ========================================
echo.
echo This script will help you set up free AI models.
echo.
echo FREE AI PROVIDERS:
echo.
echo 1. GROQ (Recommended - Fastest)
echo    - Go to: https://console.groq.com/keys
echo    - Create free account
echo    - Copy your API key
echo    - Free: 30 requests/min, 14,400/day
echo.
echo 2. OPENROUTER (Many free models)
echo    - Go to: https://openrouter.ai/keys
echo    - Create free account
echo    - Copy your API key
echo    - Free: 20 requests/min, 50/day
echo.
echo 3. GOOGLE GEMINI (Most generous)
echo    - Go to: https://aistudio.google.com/apikey
echo    - Sign in with Google
echo    - Copy your API key
echo    - Free: 15 requests/min, 1,500/day
echo.
echo 4. OLLAMA (Local - Unlimited)
echo    - Download: https://ollama.ai
echo    - Install and run
echo    - No API key needed
echo.
echo ========================================
echo.
set /p provider="Enter provider number (1-4): "
echo.

if "%provider%"=="1" (
    echo Get your Groq API key from: https://console.groq.com/keys
    set /p apikey="Paste your API key here: "
    echo {"apiKey": "%apikey%"} > groq-key.json
    echo.
    echo ✓ Groq key saved!
    echo Run: node agent.js daily-content
)

if "%provider%"=="2" (
    echo Get your OpenRouter API key from: https://openrouter.ai/keys
    set /p apikey="Paste your API key here: "
    echo {"apiKey": "%apikey%"} > openrouter-key.json
    echo.
    echo ✓ OpenRouter key saved!
    echo Run: node agent.js daily-content
)

if "%provider%"=="3" (
    echo Get your Google Gemini API key from: https://aistudio.google.com/apikey
    set /p apikey="Paste your API key here: "
    echo {"apiKey": "%apikey%"} > gemini-key.json
    echo.
    echo ✓ Gemini key saved!
    echo Run: node agent.js daily-content
)

if "%provider%"=="4" (
    echo.
    echo Install Ollama from: https://ollama.ai
    echo Then run: ollama pull llama3.2
    echo.
    echo ✓ Ollama setup instructions saved!
    echo Run: node agent.js daily-content
)

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
pause

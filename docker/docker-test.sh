echo "Eofol5 Docker test"
echo "[1/3] Cloning Eofol5..."
git clone https://github.com/wurducius/eofol5
cd eofol5 || exit
rm ./package-lock.json
echo "[2/3] Installing Eofol5..."
npm i
echo "[3/3] Running Eofol5..."
npm start

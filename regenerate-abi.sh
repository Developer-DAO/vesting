set -e
set -x

rm -rf typechain
rm -rf artifacts
rm -rf cache

npx hardhat compile

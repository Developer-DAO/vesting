import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const main: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers, deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer, treasury } = await getNamedAccounts();

  const dd = await deploy('CODE', {
    from: deployer,
    log: true,
  });

  const codeContract = await ethers.getContract('CODE');
  const connectContract = await codeContract.connect(await ethers.getSigner(deployer));
  await connectContract.transfer(treasury, ethers.utils.parseUnits((6_500_000).toString(), 18));

  console.log('CODE contract deployer:', deployer);
  console.log('CODE contract deployed to:', dd.address);
};

export default main;
main.tags = ['CODE'];

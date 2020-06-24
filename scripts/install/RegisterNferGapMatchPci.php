<?php

namespace oat\nferGapMatch\scripts\install;

use oat\taoQtiItem\model\portableElement\action\RegisterPortableElement;

/**
 * Script to register the PCI "pciNferGapMatch"
 *
 * Usage:
 * sudo -u www-data php index.php '\oat\nferGapMatch\scripts\install\RegisterNferGapMatchPci'
 *
 * @package oat\nferGapMatch\scripts\install
 */
class RegisterNferGapMatchPci extends RegisterPortableElement
{
    protected function getSourceDirectory(){
        $viewDir = \common_ext_ExtensionsManager::singleton()->getExtensionById('nferGapMatch')->getConstant('DIR_VIEWS');
        return $viewDir.implode(DIRECTORY_SEPARATOR, ['js', 'pciCreator', 'pciNferGapMatch']);
    }
}

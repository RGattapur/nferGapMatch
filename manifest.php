<?php
/**
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2015 (original work) Open Assessment Technologies;
 *
 *
 */
use oat\nferGapMatch\scripts\install\RegisterpciSampleA;

return array(
    'name' => 'nferGapMatch',
	'label' => 'NFER specific GapMatch QTI PCI',
	'description' => '',
    'license' => 'GPL-2.0',
    'version' => '0.1.0',
	'author' => 'National Foundation for Educational Research',
	'requires' => array(
	    'qtiItemPci' => '>=1.1.0',
	    'taoQtiItem' => '>=8.5.0'
    ),
	'managementRole' => 'http://www.tao.lu/Ontologies/generis.rdf#nferGapMatchManager',
    'acl' => array(
        array('grant', 'http://www.tao.lu/Ontologies/generis.rdf#nferGapMatchManager', array('ext'=>'nferGapMatch')),
    ),
    'install' => array(
        'php'	=> array(
			RegisterNferGapMatchPci::class
		)
    ),
    'update' => 'oat\\nferGapMatch\\scripts\\update\\Updater',
    'uninstall' => array(
    ),
    'autoload' => array (
        'psr-4' => array(
            'oat\\nferGapMatch\\' => dirname(__FILE__).DIRECTORY_SEPARATOR
        )
    ),
    'routes' => array(
        '/nferGapMatch' => 'oat\\nferGapMatch\\controller'
    ),
	'constants' => array(
	    # views directory
	    "DIR_VIEWS" => dirname(__FILE__).DIRECTORY_SEPARATOR."views".DIRECTORY_SEPARATOR,

		#BASE URL (usually the domain root)
		'BASE_URL' => ROOT_URL.'nferGapMatch/',
	)
);
